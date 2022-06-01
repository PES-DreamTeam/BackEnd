
const {Schema, model} = require('mongoose');

const Message = new Schema({
    chat_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    user: {
        _id:{
            type: String
        }
    },
    text: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    position: {
        type: String,
        enum : ['left','right'],
        default: 'left'
    },
});

module.exports = model('Message', Message);