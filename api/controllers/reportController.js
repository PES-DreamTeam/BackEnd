const ReportController = (dependencies) => {
    const { reportService } = dependencies; 
    const reportApp = async (req, res) => {
        try {
            const newReport = {
                ...req.body,
                user_id: req.user.id,
            }
            const result = await reportService.createNewReport(newReport); 

            return res.status(200).send({result});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    return {
        reportApp
    }

}
module.exports = ReportController;