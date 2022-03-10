const mongoose = require('mongoose');
const validator = require('validator');

const VehicleInstance = new mongoose.Schema({
    brand: {
        type: String,
        required: 'The brand is required',
    },
    model: {
        type: String,
        required: 'The model is required',
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        //hace falta validar again??????????
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    color: {
        type: String,
        required: 'The color is required',
    },
    nickname: {
        type: String,
    },
    numberPlate: {
        type: String,
        unique: true,
        required: 'The numberPlate is required',
    },
    boughtYear: {
        type: Integer,
    },

});


//Esto es double primary key. No existe mas de un vehiculo dado el mismo brand y model
Vehicle.index({brand:1, model:1, email:1} , { unique: true });

module.exports = mongoose.model('Vehicle', Vehicle);