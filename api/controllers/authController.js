const { userService, authService } = require('../services');

const register = async (req, res) => {
    try {
        const user = await userService.getByEmail(req.body.email);
        if(user) return res.status(409).send({error: "User already exists"});

        const newUser = await authService.register(req.body);
        await userService.create(newUser);
        const token = await authService.signToken(newUser._id);

        return res.status(201).send({token});
    } catch (error) {
        return res.status(500).send({msg: error})  
    }
    
}

const login = async (req, res) => {
    try {
        const user = await userService.getByEmail(req.body.email);
        if(!user) return res.status(403).send({error: 'Invalid credentials'});

        const token = await authService.login(user, req.body);
        if(token){
            return res.status(200).send({ token });
        }else {
            return res.status(403).send({Error: 'Invalid credentials'});
        }
    } catch (error) {
        return res.status(500).send({msg: error}) 
    }
}

module.exports = {
    register, 
    login
}