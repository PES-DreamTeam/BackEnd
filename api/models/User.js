const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: 'The name is required',
    },
    email: {
        type: String,
        required: 'The email is required',    
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