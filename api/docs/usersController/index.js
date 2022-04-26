const getAll = require('./getAll');
const getById = require('./getById');
const setProfilePicture = require('./setProfilePicture');
const setVehicleConfig = require('./setVehicleConfig');
const deleteUser = require('./deleteUser');
const setFavourites = require('./setFavourites');
const getFavourites = require('./getFavourites');
const setAchievement = require('./setAchievement');
const deleteVehicleConfig = require('./deleteVehicleConfig');
const getVehicleConfig = require('./getVehicleConfig');

module.exports = {
    getAllUsers: getAll,
    getUserById: getById,
    setProfilePicture: setProfilePicture,
    setVehicleConfig: setVehicleConfig,
    deleteUser: deleteUser,
    getFavourites: getFavourites,
    setFavourites: setFavourites,
    setAchievement: setAchievement,
    deleteVehicleConfig: deleteVehicleConfig,
    getVehicleConfig: getVehicleConfig,
}
