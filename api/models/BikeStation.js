const {Schema, model} = require('mongoose');

const BikeStation = new Schema({
    station_id: {
        type: Number,
    },
    name: {
        type: String,
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
    address: {
        type: String,
    },
    postCode: {
        type: Number,
    },
});

BikeStation.index({station_id:1} , { unique: true });

module.exports = model('BikeStation', BikeStation);