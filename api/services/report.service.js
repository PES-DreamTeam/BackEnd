const reportService = (dependencies) => {
    const { Reports } = dependencies;
    const createNewReport = async (report) => {
        try {
            return await Reports.create(report);
        } catch (error) {
            throw error;
        }
    }

    return {
        createNewReport
    }
}
module.exports = reportService;