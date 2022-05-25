const { UsersController } = require("../controllers");
const usersController = require("../docs/usersController");
const { Users } = require("../models");

const msgService = (dependencies) => {
    const { Message } = dependencies;

    const getLastMessage = () => {
        new Date(Math.max.apply(null, Message.map(function(e) {
            return new Date(e.createdAt);
          })));
    }

    const getMsgsById = (_id) => {
        return Message.findById(_id).messages;
    }

    const getAll = async () => {
        const allMessages = await Message.find();
        return sortedMessages = allMessages.sort((a, b) => b.createdAt - a.createdAt)
    }

    const getChatMsgs = async (id) => {
        const us = await Users.findById(id)
        const allMessages = await Message.find();
        const m = await allMessages.filter(msg1 => msg1.user._id == id);
        const sortedMessages = await m.sort((a, b) => b.createdAt - a.createdAt)
        console.log(sortedMessages)
        var r = {
            name:  us.name,
            profilePicture: us.profilePicture,
            messages: sortedMessages
        };
        return r
    }

    const getLastMsgAllUsers = async () => {
        const allUsers = await Users.find();
        const allMessages = await Message.find();
        var last = []
        for (let i = 0; i < allUsers.length; i++) {

            const m = allMessages.filter(msg1 => msg1.user._id == allUsers[i].id)
            if (m.length > 0) {
                const sortedMessages = m.sort((a, b) => b.createdAt - a.createdAt)
                last.push(sortedMessages[0]);
            }
        }
        return last
    }

    const createMessage = async (message) => {
        console.log(message.text);
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