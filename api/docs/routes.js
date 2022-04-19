const { getAllChargePoints, getChargePointById, getChargePointInfo, voteChargePoint, reportChargePoint } = require('./chargePoints');
const { getAllUsers, getUserById, setProfilePicture, setVehicleConfig, getFavourites, setFavourites} = require('./usersController');
const { createSampleVehicle, deleteSampleVehicle, getAllSampleVehicles } = require('./sampleVehiclesController');
const { createReport } = require('./reportController');
const { registerUser, loginUser } = require('./authController'); 
module.exports = {
    paths: {
        '/api/auth/register': {
            ...registerUser,
        },
        '/api/auth/login': {
            ...loginUser,
        },
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
        '/api/users/{id}/favourites': {
            ...getFavourites,
            ...setFavourites,
        },
        '/api/sampleVehicles': {
            ...getAllSampleVehicles,
            ...createSampleVehicle,
        },
        '/api/sampleVehicles/{id}': {
            ...deleteSampleVehicle,
        },
        '/api/report': {
            ...createReport,
        },
    }
}
