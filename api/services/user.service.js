const { Users } = require("../models");

const getByEmail = (email) => {
    return Users.findOne({ email });
}

const getById = (_id) => {
    return Users.findById(_id);
}

const create = (user) => {
    return Users.create(user);
}

const getAll = () => {
    return Users.find();
}

module.exports = {
    getByEmail,
    create,
    getAll,
    getById,
}
