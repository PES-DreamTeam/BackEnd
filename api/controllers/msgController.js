const MsgController = (dependencies) => {
    const { msgService } = dependencies;

    const getAll = async (req, res) => {
        try {
           const data = await msgService.getAll(); 
            if(data)
                return res.status(200).send({ data });
            else
                return res.status(404).send({msg: "No chats found"});
        } catch (error) {
           return res.status(500).send({msg: error.toString()}); 
        }
    }

    const getChatMsgs = async (req, res) => {
        try {
            const data = await msgService.getChatMsgs(req.params.id); 
            if(!data) return res.status(404).send({msg: "User Chat not found"});
            res.status(200).send({data: data});
        } catch (error) {
           return res.status(500).send({msg: error.toString()}); 
        }
    }

    const getLastMsgAllUsers = async (req, res) => {
        try {
           const data = await msgService.getLastMsgAllUsers(); 
            if(data)
                return res.status(200).send({ data });
        } catch (error) {
           return res.status(500).send({msg: error.toString()}); 
        }
    }

    const getMsgsById = async (req, res) => {
        try {
            console.log(req.params.id);
            const data = await msgService.getMsgsById(req.params.id);

            if(!data) return res.status(404).send({msg: "Message not found"});
            res.status(200).send({achievement: data});
        } catch (error) {
            res.status(500).send({error: error.toString()});
        }
    }

    const createMessage = async (req, res) => {
        try {
            const created = await msgService.createMessage(req.body);
            if(created)
                return res.status(201).send({ msg: "Message created", message: created });
            else
                return res.status(500).send({msg: "Error creating message"});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    
    return {
        getAll,
        getMsgsById,
        createMessage,
        getChatMsgs,
        getLastMsgAllUsers,
    }    
}


module.exports = MsgController;