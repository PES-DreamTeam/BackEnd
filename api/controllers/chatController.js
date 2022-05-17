const ChatController = (dependencies) => {
    const { chatService } = dependencies;

    const getAll = async (req, res) => {
        try {
           const data = await chatService.getAll(); 
            if(data)
                return res.status(200).send({ data });
            else
                return res.status(404).send({msg: "No chats found"});
        } catch (error) {
           return res.status(500).send({msg: error.toString()}); 
        }
    }
  
    return {
        getAll,
    }    
}


module.exports = ChatController;