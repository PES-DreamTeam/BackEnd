const { getAllChargePoints, getChargePointById } = require('./chargePoints');
const { getAllUsers, getUserById } = require('./usersController');
module.exports = {
    paths: {
        '/api/chargePoints': {
            ...getAllChargePoints,
        },
        '/api/chargePoints/{id}': {
            ...getChargePointById
        },
        '/api/users': {
            ...getAllUsers,
        },
        '/api/users/{id}': {
            ...getUserById,
        }
    }
}