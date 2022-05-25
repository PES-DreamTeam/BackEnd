const getAll = require('./getAll');
const getById = require('./getById');
const setProfilePicture = require('./setProfilePicture');
const setVehicleConfig = require('./setVehicleConfig');
const deleteUser = require('./deleteUser');
const setFavourites = require('./setFavourites');
const getFavourites = require('./getFavourites');
const setAchievement = require('./setAchievement');
const getAchievements = require('./getAchievements');
const deleteVehicleConfig = require('./deleteVehicleConfig');
const getVehicleConfig = require('./getVehicleConfig');
const banUser = require('./banUser');
const setLastMessage = require('./setLastMessage');

module.exports = {
    getAllUsers: getAll,
    getUserById: getById,
    setProfilePicture: setProfilePicture,
    setVehicleConfig: setVehicleConfig,
    deleteUser: deleteUser,
    getFavourites: getFavourites,
    setFavourites: setFavourites,
    setAchievement: setAchievement,
    getAchievements: getAchievements,
    deleteVehicleConfig: deleteVehicleConfig,
    getVehicleConfig: getVehicleConfig,
    banUser,
    setLastMessage: setLastMessage,
}
