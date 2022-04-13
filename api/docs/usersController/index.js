const getAll = require('./getAll');
const getById = require('./getById');
const getFavourites = require('./getFavourites');

module.exports = {
    getAllUsers: getAll,
    getUserById: getById,
    getFavourites: getFavourites,
}