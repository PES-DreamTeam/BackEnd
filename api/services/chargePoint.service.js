const axios = require('axios')
const NodeCache = require('node-cache');

const cache = new NodeCache({  stdTTL:600 });

const get = async (filter) => {
    try {
        var data = cache.get('chargePoints');

        if(!data) {
            var response = await axios.get('https://api.bsmsa.eu/ext/api/bsm/chargepoints/states')
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
                    }
                }
            });
            cache.set('chargePoints', data, 600);
        }
        if(filter) data = data.filter(item => item.id === filter);

    return data;

    } catch (error) {
        console.log(error);
        return error;
    }
}
    
module.exports = {
    get,
}