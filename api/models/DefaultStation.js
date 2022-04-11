const {Schema, model} = require('mongoose');

const DefaultStation = new Schema({
    station_id: {
        type: Number,
    },
    reports: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    airQuality: {
        type: Number,
        default: null,
    },
});

DefaultStation.index({station_id:1} , { unique: true });

module.exports = model('DefaultStation', DefaultStation);