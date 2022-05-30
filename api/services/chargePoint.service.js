const util = require('util');
const chargePointService = (dependencies) => {

    const groupByWords = [
        "id",
        "name",
        "address",
        "vehicle_type",
        "lat",
        "lng",
        "objectType"
    ]

    const { NodeCache, axios, BikeStations, DefaultStations, ReportStations, Highlights } = dependencies;
    const cache = new NodeCache({  stdTTL:600 });

    const get = async (chargePointId, group, objectType, favourites) => {
        try {
            let data = [];
            if(favourites && objectType?.length > 0 || !favourites){
                data = cache.get(`${objectType?.join() ?? "default"}`);

                if(!data) {
                    data = await getDataFromApis(objectType);
                    cache.set(`${objectType?.join() ?? "default"}`, data, 600);
                }
            }

            if(favourites) data = data.concat(favourites);
            if(chargePointId) data = data.filter(item => item?.id === chargePointId);
            if(groupByWords.includes(group)){
                const groupItems = groupBy(group);
                data = groupItems(data);
            }

            return data;

        } catch (error) {
            return error;
        }
    }

    const getInfo = async (station_id) => {
        const station = await DefaultStations.findOne({station_id});
        return station;
    }

    const createDefaultStation = async (station) => {
        return await DefaultStations.create(station);
    }

    const createReportStation = async (station) => {
        return await ReportStations.create(station);
    }


    //se puede usar para las estaciones favoritas
    const getChargePointsById = async (chargePointsIds, group) => {
        try {
            var data = cache.get("default");
            if(!data) {
                data = await getDataFromApis();
                cache.set("default", data, 600);
            }
            data = data.filter(item => chargePointsIds.includes(item.id));
            if(groupByWords.includes(group)){
                const groupItems = groupBy(group);
                data = groupItems(data);
            }

            return data;

        } catch (error) {
            return error;
        }
    }
    
    const getVehicleStations = async () => {
        var response = await axios.get('https://api.bsmsa.eu/ext/api/bsm/chargepoints/states');
        const data = response.data.map(item => {
            return {
                id: item.Station_id,
                name: item.Station_name,
                address: item.Station_address,
                lat: item.Station_lat,
                lng: item.Station_lng,
                objectType: 'vehicleStation',
                data: {
                    sockets: {
                        socket_id: item.Sockets[0].Connector_id,
                        socket_type: item.Sockets[0].Connector_types,
                        charge_modes: item.Sockets[0].Charge_modes,
                        socket_state: item.Sockets[0].State,
                    },
                    vehicle_type: item.Vehicle_type,
                }
            };
        });
        return data; 
    }


    const getBikeStations = async () => {
        try{
            var response = await axios.get('https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_status');
            var bikeStations = await BikeStations.find();
            if(!response.data.data || !bikeStations)
                return []
            const data = await Promise.all(response.data.data.stations?.map(async item => {
                const bikeStation = bikeStations?.filter(x => x.station_id === item.station_id)[0]; 
                if(bikeStation !== null && bikeStation !== undefined) 
                    return {
                        id: bikeStation.station_id,
                        name: bikeStation.name,
                        address: bikeStation.address,
                        lat: bikeStation.lat,
                        lng: bikeStation.lng,
                        objectType: 'bikeStation',
                        data: {
                            sockets: {
                                available_sockets: item.num_docks_available, //Numero de sitios totales
                                available_electrical: item.num_bikes_available_types.ebike, //Numero de bicis electricas
                                available_mechanical: item.num_bikes_available_types.mechanical, // Numero de bicis mecanicas
                                socket_state: (item.status === 'IN_SERVICE' && item.is_installed === 1 && item.is_renting === 1 && item.is_returning === 1) ? 0 : 1, // 0 = available, 1 = unavailable
                            }
                        }
                    };
            }));

            return data;

        }catch(error){
            return error;
        }
    }

    const groupBy = key => array => 
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key].toString().toLowerCase();
            objectsByKeyValue[value] = (objectsByKeyValue[value] || {
                id: obj.id,
                name: obj.name,
                address: obj.address,
                lat: obj.lat,
                lng: obj.lng,
                objectType: obj.objectType,
                data: {
                    sockets:[]
                }
            })
            if(obj.data?.sockets){
                var newSocket = JSON.parse(JSON.stringify(obj.data?.sockets));
                newSocket.vehicle_type = obj.data.vehicle_type;
                objectsByKeyValue[value].data.sockets.push(newSocket);
            }
            return objectsByKeyValue;
    }, {});

    const getDataFromApis = async (objectType) => {
        let resultData = [];
        if(objectType?.length > 0) 
            await Promise.all(objectType.map(async (item) => {
                let data;
                if(item === "vehicleStation") 
                    data = await getVehicleStations();
                else if(item === "bikeStation")
                    data = await getBikeStations();
                else if(item === "highlights")
                    data = await getHighlights();
                resultData = resultData.concat(data);
            }))
        else {
            resultData = await getVehicleStations();
            resultData = resultData.concat(await getBikeStations());
            resultData = resultData.concat(await getHighlights());
        }

        resultData = resultData.filter(x => x !== undefined && x !== null);
        return resultData;
    }
    
    const getHighlights = async () => {
        let data = await Highlights.find();	
        data = data.map(x => {
            return {id: x.id, name:x.name, address: x.address, lng:x.lng, lat:x.lat, website: x.website, phone: x.phone, objectType: x.objectType}
        });
        return data;
    }

    const voteStation = (id, wasLiked) => {
        return DefaultStations.findOneAndUpdate({station_id: id}, {$inc: {likes: wasLiked ? -1 : 1}});
    }

    const reportStation = async (id,  reportData, user) => {
        const { reportType, reportMsg, stationType } = reportData;
        await DefaultStations.findOneAndUpdate({station_id: id}, {$inc: {reports: 1}});
        const report = {
            reportType,
            reportMsg,
            stationType,
            stationId: id,
            date: new Date(),
            user_id:user.id,
            userName: user.name,
        };
        let station;
        const reportStation = await ReportStations.findOne({station_id: id});

        if(!reportStation) station = await ReportStations.create({station_id: id, reports: [report]});
        else station = await ReportStations.findOneAndUpdate({station_id: id}, { $push: { reports: report }})

        return station;
    }

    const getReports = async (id) => {
        const station = await ReportStations.findOne({station_id: id});
        return station.reports;
    }

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2-lat1) * (Math.PI/180);  // deg2rad below
        const dLon = (lon2-lon1) * (Math.PI/180);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos((lat1) * (Math.PI/180)) * Math.cos((lat2) * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c; // Distance in km
        return d;
    }

    const getNearest = async (lat, lng, howMany) => {
        var vehicleStations = await getVehicleStations();
        const groupItems = groupBy("id");
        vehicleStations = groupItems(vehicleStations);
        const stations = [];
        for (const [key, value] of Object.entries(vehicleStations)) { 
            const distance = getDistance(lat, lng, value.lat, value.lng);
            stations.push({
                id: value.id,
                name: value.name,
                address: value.address,
                lat: value.lat,
                lng: value.lng,
                objectType: value.objectType,
                data: value.data,
                distance: distance
            });
        }
        stations.sort((a, b) => a.distance - b.distance);
        return stations.slice(0, howMany);
    }

    const checkAvailable = async (station) => {
        const { sockets } = station.data;

        const available = sockets.filter(x => x.socket_state === 0);
        if(available.length > 0) return true;
        return false;
    }

    const getNearestAvailable = async (lat, lng, maxDistance) => {
        var vehicleStations = await getVehicleStations();
        const groupItems = groupBy("id");
        vehicleStations = groupItems(vehicleStations);
        let station = [];
        for (const [key, value] of Object.entries(vehicleStations)) { 
            const distance = getDistance(lat, lng, value.lat, value.lng);
            if(distance <= maxDistance && checkAvailable(value)) {
                station.push({
                    id: value.id,
                    name: value.name,
                    address: value.address,
                    lat: value.lat,
                    lng: value.lng,
                    objectType: value.objectType,
                    data: value.data,
                    distance: distance
                });
                return station;
            }
        }
        return null;
    }
    

    const feedStationToWeb = async (station) => {
        const defaultStation = await DefaultStations.findOne({station_id: station.station_id});
        return {
            station_id: station.station_id,
            reports: defaultStation.reports,
            likes: defaultStation.likes,
            airQuality: defaultStation.airQuality,
        }
    }

    return {
        get,
        groupBy,
        getBikeStations,
        getInfo,
        createDefaultStation,
        createReportStation,
        voteStation,
        reportStation,
        feedStationToWeb,
        getChargePointsById,
        getReports,
        getNearest,
        getNearestAvailable,
    }
}

module.exports = chargePointService;
