const userService = (dependencies) => {
    const { Users, VehicleInstances } = dependencies;

    /* istanbul ignore next */ 
    const getByEmail = (email) => {
        return Users.findOne({ email });
    }

    /* istanbul ignore next */ 
    const getById = (_id) => {
        return Users.findById(_id);
    }

    /* istanbul ignore next */ 
    const create = (user) => {
        return Users.create(user);
    }

    /* istanbul ignore next */ 
    const getAll = () => {
        return Users.find();
    }

    /* istanbul ignore next */ 
    const deleteUser = (_id) => {
        VehicleInstances.deleteMany({ user_id: _id });
        return Users.findByIdAndDelete(_id);
    }


    const setFavourites = async (stationId,userId) =>{
        const station = 
    }

    const feedUserToWeb = async (user) => {
        const userVehicleConfig = await VehicleInstances.find({user_id : user._id})
        return {
            _id: user._id,
            nickname: user.name,
            email: user.email,
            vehicleConfig: userVehicleConfig,
            isNew: user.isNew,
            favourites: user.favourites
        }
    }

    /* istanbul ignore next */ 
    const getVehicleConfig = (numberPlate) => {
        return VehicleInstances.findOne({numberPlate});
    }

    /* istanbul ignore next */ 
    const setVehicleConfig = (vehicleConfig) =>{
        return VehicleInstances.create(vehicleConfig)
    }

    /* istanbul ignore next */ 
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
        updateUser,
        setFavourites
    }
}

module.exports = userService;
