const getAll = require('./getAll');
const create = require('./create');
const deleteSampleVehicle = require('./deleteSampleVehicle');

module.exports = {
    getAllSampleVehicles: getAll,
    createSampleVehicle: create,
    deleteSampleVehicle: deleteSampleVehicle
}