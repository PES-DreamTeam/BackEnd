const { getAllChargePoints, getChargePointById, getChargePointInfo, voteChargePoint, reportChargePoint, getNearest } = require('./chargePoints');
const { getAllUsers, getUserById, setProfilePicture, getVehicleConfig, setVehicleConfig, deleteVehicleConfig, getFavourites, setFavourites, setAchievement, getAchievements, setLastMessage, banUser} = require('./usersController');
const { createSampleVehicle, deleteSampleVehicle, getAllSampleVehicles, getBrands, getModels } = require('./sampleVehiclesController');
const { createReport, getReports, markAsResolved } = require('./reportController');
const { getClosest, getClosestAvailable } = require('./serviceController');
const {getAchievementById, getAllAchievements} = require('./achievementController');
const { createMessage, getAllMsg, getChatMsgs, getLastMsgAllUsers } = require('./msgController');
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
        '/api/users/{id}/lastMessage': {
            ...setLastMessage,
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
        '/api/users/banUser/{id}':{
            ...banUser
        },
        '/api/achievements': {
            ...getAllAchievements,
        },
        '/api/achievements/{id}': {
            ...getAchievementById,
        },
        '/api/message': {
            ...createMessage,
            ...getAllMsg,
        },
        '/api/message/{id}': {
            ...getChatMsgs,
        },
        '/api/message/chat/last': {
            ...getLastMsgAllUsers,
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
        '/api/report/getReports':{
            ...getReports,
        },
        '/api/report/markAsResolved':{
            ...markAsResolved,
        },
        '/api/service/closest': {
            ...getClosest,
        },
        '/api/service/closestAvailable': {
            ...getClosestAvailable,
        },
    }
}
