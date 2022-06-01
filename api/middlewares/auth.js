const jwt = require('jsonwebtoken');

module.exports = (userService, adminRequired=false) => (req, res, next) => {
    var token = req.headers.authorization;
    if(!token){
        return res.status(401).send({msg: 'No token provided'});
    }
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET_WORD, async (err, decoded) => {
        if(!decoded) return res.status(401).send({msg: 'Invalid token'});
        const { _id } = decoded;
        const user = await userService.getById(_id);
        if(!user || (adminRequired && !user.isAdmin) || user?.banned) return res.status(401).send({msg: 'You are not authorized'});
        req.user = user;
        next();
    })
}