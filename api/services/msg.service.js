const { Users } = require("../models");

const msgService = (dependencies) => {
    const { Message } = dependencies;

    const getLastMessage = () => {
        new Date(Math.max.apply(null, Message.map(function(e) {
            return new Date(e.createdAt);
          })));
    }

    const getMsgsById = (_id) => {
        console.log(Message.findById(_id).messages);
        return Message.findById(_id).messages;
    }

    const getAll = () => {
        return Message.find();
    }

    const getChatMsgs = async (id) => {
        const allMessages = await Message.find();
        const m = await allMessages.filter(msg1 => msg1.user_id == id);
        return m;
    }

    const getLastMsgAllUsers = async () => {
        const allUsers = await Users.find();
        const allMessages = await Message.find();
        const m = await allMessages.filter(msg1 => allUsers.id);
        return m;
    }

    const createMessage = async (message) => {
        return await Message.create(message);
    }

    return {
        getMsgsById,
        getAll,
        createMessage,
        //getLastMessage,
        getChatMsgs,
        getLastMsgAllUsers
    }
}
module.exports = msgService;