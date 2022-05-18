const { default: axios } = require('axios');
const { Vehicles } = require('../models');

const getAll = async (group) => {
    var vehicles = await Vehicles.find(); 
    if(group) {
        const groupItems = groupBy(group);
        vehicles = groupItems(vehicles);
    }
    return vehicles;
}

const create = async (vehicle) => {
    return await Vehicles.create(vehicle);
}

const deleteSampleVehicle = async (id) => {
    return await Vehicles.findByIdAndRemove(id);
}

const getBrands = async () => {
    const result = await axios.get('https://car-data.p.rapidapi.com/cars/makes',
    {
        headers: {
            'X-RapidApi-Key': process.env.RAPID_KEY
        }
    })
    return result.data;
}

const getModels = async (brand) => {
    const result = await axios.get(`https://car-data.p.rapidapi.com/cars?make=${brand}&limit=50&page=0`,
    {
        headers: {
            'X-RapidApi-Key': process.env.RAPID_KEY
        }
    })
    return result.data;   
}

const groupBy = key => array => 
    array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key].toLowerCase();
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
}, {});

module.exports = {
    getAll,
    create,
    deleteSampleVehicle,
    getBrands,
    getModels
}


