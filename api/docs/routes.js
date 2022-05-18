const { getAllChargePoints, getChargePointById, getChargePointInfo, voteChargePoint, reportChargePoint, getNearest } = require('./chargePoints');
const { getAllUsers, getUserById, setProfilePicture, getVehicleConfig, setVehicleConfig, deleteVehicleConfig, getFavourites, setFavourites, setAchievement, getAchievements} = require('./usersController');
const { createSampleVehicle, deleteSampleVehicle, getAllSampleVehicles, getBrands, getModels } = require('./sampleVehiclesController');
const { createReport } = require('./reportController');
const { getClosest } = require('./serviceController');
const {getAchievementById, getAllAchievements} = require('./achievementController');
const { createMessage } = require('./msgController');
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
            ...reportChargePoint,
        },
        '/api/chargePoints/{id}/nearest': {
            ...getNearest,
        },
        '/api/users/{id}/vehicleConfig': {
            ...getVehicleConfig,
            ...setVehicleConfig,
            ...deleteVehicleConfig,
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
        '/api/users/{id}/achievements': {
            ...getAchievements,
            ...setAchievement,
        },
        '/api/achievements': {
            ...getAllAchievements,
        },
        '/api/achievements/{id}': {
            ...getAchievementById,
        },
        '/api/message': {
            ...createMessage,
        },
        '/api/sampleVehicles': {
            ...getAllSampleVehicles,
            ...createSampleVehicle,
        },
        '/api/sampleVehicles/{id}': {
            ...deleteSampleVehicle,
        },
        '/api/sampleVehicles/brands': {
            ...getBrands,
        },
        '/api/sampleVehicles/models': {
            ...getModels,
        },
        '/api/report': {
            ...createReport,
        },
        '/api/service/closest': {
            ...getClosest,
        },
    }
}
