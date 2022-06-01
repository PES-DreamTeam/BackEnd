const {Schema, model} = require('mongoose');

const VehicleInstance = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    brand: {
        type: String,
        required: 'The brand is required',
    },
    model: {
        type: String,
        required: 'The model is required',
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
    vehicleType: {
        type: Number,
        required: 'The vehicleType is required',
    }
});

VehicleInstance.index({numberPlate:1, user_id:1} , { unique: true });

module.exports = model('VehicleInstance', VehicleInstance);