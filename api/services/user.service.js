const { Users, VehicleInstances } = require("../models");

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

const feedUserToWeb = async (user) => {
    const userVehicleConfig = await VehicleInstances.find({user_id : user._id})
    return {
        _id: user._id,
        nickname: user.name,
        email: user.email,
        vehicleConfig: userVehicleConfig,
        isNew: user.isNew,
    }
}

const getVehicleConfig = (numberPlate) => {
    return VehicleInstances.findOne({numberPlate});
}

const setVehicleConfig = (vehicleConfig) =>{
    return VehicleInstances.create(vehicleConfig)
}

const updateUser = (id, user) => {
    return Users.findByIdAndUpdate(id, user);
}


module.exports = {
    getByEmail,
    create,
    getAll,
    getById,
    deleteUser,
    feedUserToWeb,
    setVehicleConfig,
    getVehicleConfig,
    updateUser
}
