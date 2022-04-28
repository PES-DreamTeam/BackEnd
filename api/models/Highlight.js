const {Schema, model} = require('mongoose');

const Highlight = new Schema({
    name: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    objectType: {
        type: String,
        default: "highlight"
    }
})
Highlight.index({name:1, lat: 1, lng: 1} , { unique: true });
module.exports = model('Highlight', Highlight);