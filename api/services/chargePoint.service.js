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

    const { NodeCache, axios, BikeStations, DefaultStations, ReportStations } = dependencies;
    const cache = new NodeCache({  stdTTL:600 });

    const get = async (chargePointId, group, objectType, userId) => {
        try {
            var data = cache.get(`${objectType?.join() ?? "default"}`);

            if(!data) {
                data = await getDataFromApis(objectType, userId);
                cache.set(`${objectType?.join() ?? "default"}`, data, 600);
            }
            if(chargePointId) data = data.filter(item => item.id === chargePointId);
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
            var newSocket = JSON.parse(JSON.stringify(obj.data.sockets));
            newSocket.vehicle_type = obj.data.vehicle_type;
            objectsByKeyValue[value].data.sockets.push(newSocket);
            return objectsByKeyValue;
    }, {});

    const getDataFromApis = async (objectType, userId) => {
        let resultData = [];
        if(objectType?.length > 0) 
            await Promise.all(objectType.map(async (item) => {
                let data;
                if(item === "vehicleStation") 
                    data = await getVehicleStations();
                else if(item === "bikeStation")
                    data = await getBikeStations();
                resultData = resultData.concat(data);
            }))
        else {
            resultData = await getVehicleStations();
            resultData = resultData.concat(await getBikeStations());
        }

        if(userId) {
            const user = await User.findById(userId);
            await Promise.all(user?.favourites?.map(async (item) =>{
                resultData = resultData.concat(await getChargePointsById(item));
            }))
        }
        resultData = resultData.filter(x => x !== undefined && x !== null);
        return resultData;
    }

    const voteStation = (id, wasLiked) => {
        return DefaultStations.findOneAndUpdate({station_id: id}, {$inc: {likes: wasLiked ? -1 : 1}});
    }

    const reportStation = async (id, type, msg) => {
        await DefaultStations.findOneAndUpdate({station_id: id}, {$inc: {reports: 1}});
        const report = {reportType: type, reportMsg: msg};
        const station = await ReportStations.findOneAndUpdate({station_id: id}, { $push: { reports: report }})
        return station;
    }

    const getReports = async (id) => {
        const station = await ReportStations.findOne({station_id: id});
        console.log(station);
        return station.reports;
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
        getReports
    }
}

module.exports = chargePointService;
