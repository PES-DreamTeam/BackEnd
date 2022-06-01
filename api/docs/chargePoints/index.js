const getAll = require('./getAll');
const getById = require('./getById');
const getInfo = require('./getInfo');
const voteStation = require('./voteStation');
const reportStation = require('./reportStation');
const getNearest = require('./getNearest');

module.exports = {
    getAllChargePoints: getAll,
    getChargePointById: getById, 
    getChargePointInfo: getInfo, 
    voteChargePoint: voteStation,
    reportChargePoint: reportStation,
    getNearest: getNearest,
}