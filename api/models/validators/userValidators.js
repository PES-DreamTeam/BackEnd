const validator =  require('validator');
exports.validateEmail = (email) => {
    if(!validator.isEmail(email)){
        throw new Error('Email is invalid');
    }
}