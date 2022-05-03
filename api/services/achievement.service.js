const achievementService = (dependencies) => {
    const { Achievements } = dependencies;

    const createNewAchievement = async (achievement) => {
        try {
            return await Achievements.create(achievement);
        } catch (error) {
            throw error;
        }
    }

    const getById = (_id) => {
        console.log("Service id: ");
        console.log(_id);
        return Achievements.findById(_id);
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