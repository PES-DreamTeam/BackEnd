const {Schema, model} = require('mongoose');

const Achievement = new Schema({
    achievement_id: {
        type: Number,
    },
    description: {
        type: String,
    },
    objective: {
        type: Number,
    },
    imgGold: {
        type: String,
    },
    imgSilver: {
        type: String,
    },
    imgBronze: {
        type: String,
    },
});

Achievement.index({achievement_id:1} , { unique: true });

module.exports = model('Achievement', Achievement);