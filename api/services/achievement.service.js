const achievementService = (dependencies) => {
    const { Achievements } = dependencies;

    const createNewAchievement = async (achievement) => {
        try {
            return await Achievements.create(achievement);
        } catch (error) {
            throw error;
        }
    }

    const getById = async (id, tier) => {
        try {
            console.log(id, tier);
            console.log(await Achievements.findOne({id, tier}));
            return await Achievements.findOne({id, tier});
        }
        catch (error) {
            throw error;
        }
    }

    const getAll = () => {
        return Achievements.find();
    }

    return {
        createNewAchievement,
        getById,
        getAll
    }
}
module.exports = achievementService;