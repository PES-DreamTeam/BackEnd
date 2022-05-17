const {Schema, model} = require('mongoose');

const Chat = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    allMsgs: {
        type: [String],
    },
});

module.exports = model('Chat', Chat);