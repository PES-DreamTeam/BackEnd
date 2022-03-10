const mongoose = require('mongoose');
const validator = require('validator');

const Vehicle = new mongoose.Schema({
    brand: {
        type: String,
        required: 'The brand is required',
    },
    model: {
        type: String,
        required: 'The model is required',
    },
    //Hace falta que el chargerType sea de tipo ChargerType
    chargerType: {
        type: String,
    }
});


//Esto es double primary key. No existe mas de un vehiculo dado el mismo brand y model
Vehicle.index({brand:1, model:1} , { unique: true });

module.exports = mongoose.model('Vehicle', Vehicle);