const { userService } = require("../services");

const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        return res.status(200).send({ users });
    } catch (error) {
       return res.status(500).send({msg: error.toString()});
    }
}

const getById = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        if(!user) return res.status(404).send({msg: "User not found"});

        return res.status(200).send({ user: user });
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

module.exports = {
    getAll,
    getById,
    deleteUser
}