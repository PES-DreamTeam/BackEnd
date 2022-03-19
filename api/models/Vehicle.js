const mongoose = require('mongoose');

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

/* Vehicle.index({brand:1, model:1} , { unique: true }); */

module.exports = mongoose.model('Vehicle', Vehicle);