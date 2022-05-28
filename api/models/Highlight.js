const {Schema, model} = require('mongoose');

const Highlight = new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    address: {
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
    website : {
        type: String,
    },
    phone : {
        type: String,
    },
    objectType: {
        type: String,
        default: "highlight"
    }
})
Highlight.index({name: 1, lat: 1, lng: 1} , { unique: true });
module.exports = model('Highlight', Highlight);