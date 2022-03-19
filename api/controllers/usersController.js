const { userService } = require("../services");

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

const deleteUser = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        if(!user) return res.status(404).send({msg: "User not found"});

        if(user._id.toString() === req.params.id.toString()) {
            await userService.deleteUser(user._id);
            return res.status(200).send({msg: "User deleted"});
        }else {
            return res.status(403).send({msg: "You are not authorized"});
        }
    } catch (error) {
        return res.status(500).send({msg: error.toString()});
    }
}

const setVehicleConfig = async (req, res) => {
    try {
        const bodyRequest = req.body;
        bodyRequest.user_id = req.params.id
        console.log(bodyRequest);
        console.log(req.params.id);
        console.log(req.body);
        const vehicleConfig = await userService.setVehicleConfig(bodyRequest);
        console.log(vehicleConfig);
        if (vehicleConfig) {
            return res.status(200).send({vehicleConfig});
        }
        else return res.status(500).send({msg: "There has been an error saving the configuration"})

    } catch (error) {
        console.log(error);
        return res.status(500).send({msg: error.toString()});
    }
}

module.exports = {
    getAll,
    getById,
    deleteUser,
    setVehicleConfig
}