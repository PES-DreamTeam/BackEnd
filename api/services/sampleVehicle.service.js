const { Vehicles } = require('../models');

const getAll = async (filter) => {
    var vehicles = await Vehicles.find(); 
    if(filter) {
        const groupItems = groupBy(filter);
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

const groupBy = key => array => 
    array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key].toLowerCase();
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
}, {});


module.exports = {
    getAll,
    create,
    deleteSampleVehicle
}


