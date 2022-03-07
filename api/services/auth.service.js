const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const login = (userDb, loginData) => {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(loginData.password, userDb.salt, 10000, 64, 'sha1', (err, key) => {
            const encryptedPassword = key.toString('base64');
            if(encryptedPassword !== userDb.password) {
                reject({Error: 'Invalid credentials'});
            }
            const token = signToken(userDb._id);
            resolve(token);
        })
    })
}
const register = (registerData) => {
    const {email, password, name} = registerData;

    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, salt) => {
            const newSalt = salt.toString('base64');
            crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
                const encryptedPassword = key.toString('base64');
                resolve({ email, name, password: encryptedPassword, salt: newSalt});
            })
        })
    })
}

const signToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_WORD, {
        expiresIn: '100d'
    });
}

module.exports = {
    login,
    register,
    signToken
};