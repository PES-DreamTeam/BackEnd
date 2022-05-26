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

            const filteredMessages = allMessages.filter(msg1 => msg1.user._id == allUsers[i].id)
            if (filteredMessages.length > 0) {
                const sortedMessages = filteredMessages.sort((a, b) => b.createdAt - a.createdAt)
                const adding = sortedMessages[0] = {
                    user:{
                        userId: allUsers[i].id,
                        name: allUsers[i].name,
                        profilePicture: allUsers[i].profilePicture,
                    },
                    _id: sortedMessages[0]._id,
                    chat_id: sortedMessages[0].chat_id,
                    text: sortedMessages[0].text,
                    createdAt: sortedMessages[0].createdAt,
                    position: sortedMessages[0].position,
                }
                last.push(adding);
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