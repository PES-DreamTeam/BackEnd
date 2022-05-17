const msgService = (dependencies) => {
    const { Message } = dependencies;

    const getMsgsById = (_id) => {
        console.log(Message.findById(_id).messages);
        return Message.findById(_id).messages;
    }

    const getAll = () => {
        return Message.find();
    }

    const createMessage = async (message) => {
        return await Message.create(message);
    }

    return {
        getMsgsById,
        getAll,
        createMessage,
    }
}
module.exports = msgService;