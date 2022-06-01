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

    const getReports = async (req, res) => {
        try {
            if(req.query.reportType !== 'station' && req.query.reportType !== 'app') 
                return res.status(409).send({msg: "Wrong data provided"});

            const reports = await reportService.getReports(req.query.reportType); 
            return res.status(200).send({reports});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const markAsResolved = async (req, res) => {
        try {
            if(    (req.query.reportType === 'app' && !req.query.reportId)
                || (req.query.reportType === 'station' && (!req.query.stationId || !req.query.reportId)) 
                || (req.query.reportType !== 'app' && req.query.reportType !== 'station')
              )return res.status(409).send({msg: "Wrong data provided"});

            const report = await reportService.markAsResolved(req.query.stationId, req.query.reportId, req.query.reportType); 
            if(report)
                return res.status(200).send({msg: "Report marked as resolved"});
            else
                return res.status(404).send({msg: "Report not found"});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    return {
        reportApp,
        getReports,
        markAsResolved,
    }

}
module.exports = ReportController;