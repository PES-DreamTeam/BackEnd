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
        return sortedMessages = allMessages.sort((a, b) => a.createdAt - b.createdAt)
    }

    const getChatMsgs = async (id) => {
        const currentUser = await Users.findById(id)
        if(currentUser){
            const allMessages = await Message.find();
            const chatMessages = await allMessages.filter(msg1 => msg1.chat_id == id);
            const sortedMessages = await chatMessages.sort((a, b) => a.createdAt - b.createdAt)
            var result = {
                name:  currentUser.name,
                profilePicture: currentUser.profilePicture,
                userId: id,
                messages: sortedMessages
            };
            return result
        }
    }

    const getLastMsgAllUsers = async () => {
        const allUsers = await Users.find();
        const allMessages = await Message.find();
        var last = []
        for (let i = 0; i < allUsers.length; i++) {

            const filteredMessages = allMessages.filter(msg1 => msg1.chat_id == allUsers[i].id)
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