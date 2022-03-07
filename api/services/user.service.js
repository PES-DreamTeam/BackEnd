const { Users } = require("../models");

const getByEmail = (email) => {
    return Users.findOne({ email });
}

const create = (user) => {
    return Users.create(user);
}

module.exports = {
    getByEmail,
    create,
}
