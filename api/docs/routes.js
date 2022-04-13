const { getAllChargePoints, getChargePointById, getChargePointInfo, voteChargePoint, reportChargePoint } = require('./chargePoints');
const { getAllUsers, getUserById, setProfilePicture, setVehicleConfig} = require('./usersController');
const { createSampleVehicle, deleteSampleVehicle, getAllSampleVehicles } = require('./sampleVehiclesController');
module.exports = {
    paths: {
        '/api/chargePoints': {
            ...getAllChargePoints,
        },
        '/api/chargePoints/{id}': {
            ...getChargePointById
        },
        '/api/chargePoints/{id}/info': {
            ...getChargePointInfo
        },
        '/api/chargePoints/{id}/vote': {
            ...voteChargePoint
        },
        '/api/chargePoints/{id}/report': {
            ...reportChargePoint
        },
        '/api/users/{id}/vehicleConfig': {
            ...setVehicleConfig,
        },
        '/api/users/{id}/profilePicture': {
            ...setProfilePicture,
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