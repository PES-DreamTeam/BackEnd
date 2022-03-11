const { Vehicles } = require('../models');

const getAll = async () => {
    return await Vehicles.find(); 
}

const create = async (vehicle) => {
    return await Vehicles.create(vehicle);
}

const deleteSampleVehicle = async (id) => {
    return await Vehicles.findByIdAndRemove(id);
}

module.exports = {
    getAll,
    create,
    deleteSampleVehicle
}


