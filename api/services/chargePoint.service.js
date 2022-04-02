const util = require('util');
const chargePointService = (dependencies) => {

    const groupByWords = [
        "id",
        "name",
        "address",
        "vehicle_type",
        "lat",
        "lng"
    ]

    const { NodeCache, axios } = dependencies;
    const cache = new NodeCache({  stdTTL:600 });

    const get = async (chargePointId, group) => {
        try {
            var data = cache.get('chargePoints');

            if(!data) {
                var response = await axios.get('https://api.bsmsa.eu/ext/api/bsm/chargepoints/states');
                data = response.data.map(item => {
                    return {
                        id: item.Station_id,
                        name: item.Station_name,
                        address: item.Station_address,
                        vehicle_type: item.Vehicle_type,
                        lat: item.Station_lat,
                        lng: item.Station_lng,
                        socket_data: {
                            socket_id: item.Sockets[0].Connector_id,
                            socket_type: item.Sockets[0].Connector_types,
                            charge_modes: item.Sockets[0].Charge_modes,
                            socket_state: item.Sockets[0].State,
                        },
                    }
                });
                cache.set('chargePoints', data, 600);
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

    const groupBy = key => array => 
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key].toLowerCase();
            objectsByKeyValue[value] = (objectsByKeyValue[value] || {
                id: obj.id,
                name: obj.name,
                address: obj.address,
                lat: obj.lat,
                lng: obj.lng,
                sockets:[]
            })
            var newSocket = JSON.parse(JSON.stringify(obj.socket_data));
            newSocket.vehicle_type = obj.vehicle_type;
            objectsByKeyValue[value].sockets.push(newSocket);
            return objectsByKeyValue;
    }, {});

    return {
        get,
        groupBy
    }
}

module.exports = chargePointService;