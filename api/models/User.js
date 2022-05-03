const { array } = require('joi');
const mongoose = require('mongoose');
const validator = require('./validators/userValidators');
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
        /* istanbul ignore next */
        validate(value){
            validator.validateEmail(value);
        }
    },
    password: {
        type: String,
        required: 'The password is required',
    },
    salt: { //para autenticar contraseña
        type: String,
        required: 'The salt is required',
    },
    profilePicture: {
        type: String,
    },
    isNew: {
        type: Boolean,
        default: true,
    },
    likes: {
        type: [String],
        default: [],
    },
    reports: {
        type: [String],
        default: [],
    },
    profilePicture: {
        type: String,
        default: "https://ibb.co/BtdrzZd",
    },
    favourites:{
        type: [String],
        default: [],
    },
    achievements: [{
        achievement_id: String,
        progress: Number,
        objective: Number,
    }],
    currentVehicle: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model('User', User);
