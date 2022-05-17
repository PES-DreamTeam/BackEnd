const AchievementController = (dependencies) => {
    const { achievementService } = dependencies;

    const getAll = async (req, res) => {
        try {
           const data = await achievementService.getAll(); 
            if(data)
                return res.status(200).send({ data });
            else
                return res.status(404).send({msg: "No achievements found"});
        } catch (error) {
           return res.status(500).send({msg: error.toString()}); 
        }
    }

    const getById = async (req, res) => {
        try {           
            const data = await achievementService.getById(req.params.id, req.query.tier);
            if(!data) return res.status(404).send({msg: "Achievement not found"});
            res.status(200).send({achievement: data});
        } catch (error) {
            res.status(500).send({error: error.toString()});
        }
    }

    
    return {
        getAll,
        getById
    }    
}


module.exports = AchievementController;