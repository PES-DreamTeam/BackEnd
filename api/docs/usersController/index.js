const getAll = require('./getAll');
const getById = require('./getById');
const setProfilePicture = require('./setProfilePicture');
const setVehicleConfig = require('./setVehicleConfig');
const deleteUser = require('./deleteUser');


module.exports = {
    getAllUsers: getAll,
    getUserById: getById,
    setProfilePicture: setProfilePicture,
    setVehicleConfig: setVehicleConfig,
    deleteUser: deleteUser
}