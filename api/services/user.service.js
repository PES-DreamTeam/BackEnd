const userService = (dependencies) => {
    console.log(dependencies);
    const { Users, VehicleInstances } = dependencies;
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

    return {
        getByEmail,
        getById,
        create,
        getAll,
        deleteUser,
        feedUserToWeb,
        getVehicleConfig,
        setVehicleConfig,
        updateUser
    }
}

module.exports = userService;
