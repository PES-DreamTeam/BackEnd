const getAll = require('./getAll');
const getById = require('./getById');
const getInfo = require('./getInfo');

module.exports = {
    getAllChargePoints: getAll,
    getChargePointById: getById, 
    getChargePointInfo: getInfo, 
}