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
            return await Achievements.findOne({achievement_id: id.toString(), achievement_tier: tier.toString()});
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