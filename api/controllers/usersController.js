require('dotenv').config({path: '../.env'});

const UsersController = (dependencies) => {
    const { userService } = dependencies;


    const getAll = async (req, res) => {
        try {
            const users = await userService.getAll();
            const result = await Promise.all(users.map( async user => await userService.feedUserToWeb(user)))
            return res.status(200).send({ result });
        } catch (error) {
        return res.status(500).send({msg: error.toString()});
        }
    }

    const getById = async (req, res) => {
        try {
            const user = await userService.getById(req.params.id);
            if(!user) return res.status(404).send({msg: "User not found"});

            return res.status(200).send({user: await userService.feedUserToWeb(user)});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const updateUser = async (req, res) => {
        try {
            const user = await userService.updateUser(req.user.id, req.body);
            if(!user) return res.status(404).send({msg: "User not found"});

            return res.status(200).send({user: await userService.feedUserToWeb(user)});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const deleteUser = async (req, res) => {
        try {
            const user = await userService.getById(req.params.id);
            if(!user) return res.status(404).send({msg: "User not found"});

            if(user._id.toString() === req.user.id.toString()) {
                await userService.deleteUser(user._id);
                return res.status(200).send({msg: "User deleted"});
            }else {
                return res.status(403).send({msg: "You are not authorized"});
            }
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const setProfilePicture = async (req, res) => {
        try {
            const user = await userService.setProfilePicture(req.user.id, req.body.image);
            if(!user) return res.status(404).send({msg: "User not found"});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const setVehicleConfig = async (req, res) => {
        try {
            if(req.params.id !== req.user.id) return res.status(401).send({msg: 'You are not authorized'});
            const bodyRequest = req.body;
            bodyRequest.user_id = req.params.id
            const existingVehicleConfig = await userService.getVehicleConfig(bodyRequest.numberPlate);
            if(existingVehicleConfig)
                return res.status(409).send({attribute:"NumberPlate", error: "The number plate already exists"});

                const vehicleConfig = await userService.setVehicleConfig(bodyRequest);
                if (vehicleConfig) {

                    await userService.updateUser(req.params.id, {"isNew":false});
                    var user = await userService.getById(req.params.id);
                    user = await userService.feedUserToWeb(user);

                    return res.status(200).send({user});
                }
                else return res.status(500).send({msg: "There has been an error saving the configuration"})

        } catch (error) {
            return res.status(500).send({msg: error});
        }
    }

    return {
        getAll,
        getById,
        deleteUser,
        setVehicleConfig,
        updateUser,
        setProfilePicture,
    }
}

module.exports = UsersController; 