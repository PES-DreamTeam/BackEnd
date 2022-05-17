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
            const data = await msgService.createMessage(req.params);
            res.status(200).send({message: data});
        } catch (error) {
            res.status(500).send({error: error.toString()});
        }
    }

    
    return {
        getAll,
        getMsgsById,
        createMessage,
    }    
}


module.exports = MsgController;