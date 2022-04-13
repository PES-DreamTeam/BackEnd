const AuthController = (dependencies) => {
    const { userService, authService } = dependencies;

    const register = async (req, res) => {
        try {
            const user = await userService.getByEmail(req.body.email);
            if(user) return res.status(409).send({error: "User already exists"});

            let newUser = await authService.register(req.body);
            newUser = await userService.create(newUser);
            newUser = await userService.feedUserToWeb(newUser);
            const token = await authService.signToken(newUser._id);

            return res.status(201).send({token, user: newUser});
        } catch (error) {
            return res.status(500).send({msg: error.toString()})  
        }
    }

    const login = async (req, res) => {
        try {
            const user = await userService.getByEmail(req.body.email);
            if(!user) return res.status(403).send({error: 'Invalid credentials'});

            const token = await authService.login(user, req.body);
            if(token){
                return res.status(200).send({ token, user: await userService.feedUserToWeb(user)});
            }else {
                return res.status(403).send({Error: 'Invalid credentials'});
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send({msg: error.toString()}) 
        }
    }

    return {
        register,
        login
    }

}

module.exports = AuthController;

