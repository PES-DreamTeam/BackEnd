const {Schema, model} = require('mongoose');

const Achievement = new Schema({
    achievement_id: {
        type: String,
    },
    achievement_tier: {
        type: String,
    },
    description: {
        type: String,
    },
    objective: {
        type: Number,
    },
    image: {
        type: String,
    }
});

Achievement.index({achievement_id:1, achievement_tier: 1} , { unique: true });

module.exports = model('Achievement', Achievement);