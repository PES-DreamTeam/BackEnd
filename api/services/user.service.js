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

const deleteUser = (_id) => {
    return Users.findByIdAndDelete(_id);
}

const feedUserToWeb = (user) => {
    return {
        _id: user._id,
        nickname: user.name,
        email: user.email,
    }
}

module.exports = {
    getByEmail,
    create,
    getAll,
    getById,
    deleteUser,
    feedUserToWeb
}
