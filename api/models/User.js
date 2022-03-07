const mongoose = require('mongoose');
const validator = require('validator');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: 'The name is required',
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: 'The password is required',
    },
    salt: {
        type: String,
        required: 'The salt is required',
    }
})

module.exports = mongoose.model('User', User);