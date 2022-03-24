const { getAllChargePoints, getChargePointById } = require('./chargePoints');
const { getAllUsers, getUserById } = require('./usersController');
const { createSampleVehicle, deleteSampleVehicle, getAllSampleVehicles } = require('./sampleVehiclesController');
const setVehicleConfig = require('./usersController/setVehicleConfig');
module.exports = {
    paths: {
        '/api/chargePoints': {
            ...getAllChargePoints,
        },
        '/api/chargePoints/{id}': {
            ...getChargePointById
        },
        '/api/users/{id}/vehicleConfig': {
            ...setVehicleConfig,
        },
        '/api/users': {
            ...getAllUsers,
        },
        '/api/users/{id}': {
            ...getUserById,
        },
        '/api/sampleVehicles': {
            ...getAllSampleVehicles,
            ...createSampleVehicle,
        },
        '/api/sampleVehicles/{id}': {
            ...deleteSampleVehicle,
        }
    }
}