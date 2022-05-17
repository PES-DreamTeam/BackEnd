const chatService = (dependencies) => {
    const { Chat } = dependencies;

    /*const getMsgsById = (_id) => {
        console.log(Message.findById(_id).messages);
        return Message.findById(_id).messages;
    }*/

    const getAll = () => {
        return Chat.find();
    }

    return {
        //getMsgsById,
        getAll
    }
}
module.exports = chatService;