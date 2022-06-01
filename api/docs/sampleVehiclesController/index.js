const getAll = require('./getAll');
const create = require('./create');
const deleteSampleVehicle = require('./deleteSampleVehicle');
const getBrands = require('./getBrands');
const getModels = require('./getModels');

module.exports = {
    getAllSampleVehicles: getAll,
    createSampleVehicle: create,
    deleteSampleVehicle: deleteSampleVehicle,
    getBrands,
    getModels
}