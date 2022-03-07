const { userService } = require("../services");

const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        return res.status(200).send({ users });
    } catch (error) {
       return res.status(500).send({msg: error});
    }
}

const getById = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        if(user._id.toString() === req.user._id.toString()) 
            return res.status(200).send({ user: req.user });
        else
            return res.status(403).send({msg: "You are not authorized"});
    } catch (error) {
        return res.status(500).send({msg: error});
    }
}

module.exports = {
    getAll,
    getById
}