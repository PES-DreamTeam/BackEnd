const reportService = (dependencies) => {
    const { Reports, ReportStations, Users } = dependencies;
    const createNewReport = async (report) => {
        try {
            return await Reports.create(report);
        } catch (error) {
            throw error;
        }
    }

    const getReports = async (reportType) => {
        let data = [];
        if(reportType === 'station'){
            data = await getStationReports();
        } 
        else if(reportType === 'app'){
            data = await getAppReports(); 
        }
        return data;
    }

    const markAsResolved = async (stationId, reportId, reportType) => {
        if(reportType === 'station'){
            return await markStationAsResolved(stationId, reportId);
        }else if(reportType === 'app'){
            return await markAppAsResolved(reportId);
        }
    }

// #region private functions
    const getStationReports = async () => {
        let reports = await ReportStations.find();
        reports = reports.filter(r => r.reports.length > 0);
        let resolvedReports =[]; 
        let unresolvedReports = [];
        await Promise.all(reports.map(async (station) => {
            const resolved = await fitReports(true, station); 
            resolvedReports = resolvedReports.concat(resolved);
            const unresolved = await fitReports(false, station);
            unresolvedReports = unresolvedReports.concat(unresolved);
        }))
        resolvedReports = resolvedReports.filter(x => x);
        unresolvedReports = unresolvedReports.filter(x => x)

        return {resolvedReports, unresolvedReports};
    }

    const fitReports = async (getResolved, station) => {
        return await Promise.all(station.reports.map(async (report) => {
                if(getResolved && report.isResolved){
                    return await returnReportFormatted(report, station); 
                }
                else if(!getResolved && !report.isResolved){
                    return await returnReportFormatted(report, station);        
                }
            }).filter(x => x !== undefined));
    }
    const returnReportFormatted = async (report, station) => {
        var user = await Users.findOne({_id: report.user_id});
        return {
            reportType: report.reportType,
            reportMsg: report.reportMsg,
            stationType: report.stationType,
            createdAt: report.date,
            userName: report.userName,
            isResolved: report.isResolved,
            reportId: report._id,
            stationId: station.station_id,
            userId: report.user_id,
            isBanned: user.banned
        }
    }

    const getAppReports = async () => {
        let reports = await Reports.find();
        reports = await Promise.all(reports.map(async (report) =>{
            let user = await Users.findById(report.user_id);
            return {
                type: report.type,
                platform: report.platform,
                os: report.os,
                subject: report.subject,
                details: report.details,
                userName: user.name,
                isBanned: user.banned,
                userId: report.user_id,
                isResolved: report.isResolved,
                createdAt: report.createdAt,
                reportId: report._id,
            }
        }))
        let resolvedReports = reports.filter(r => r.isResolved);
        let unresolvedReports = reports.filter(r => !r.isResolved);
        return {resolvedReports, unresolvedReports};
    }
   
    const markAppAsResolved = async (reportId) => {
        try {
            return await Reports.findByIdAndUpdate(reportId, {isResolved: true});
        } catch (error) {
            throw error;
        }
    }

    const markStationAsResolved = async (stationId, reportId) => {
        try {
            return await ReportStations.findOneAndUpdate({station_id: stationId, 'reports._id': reportId}, {$set: {'reports.$.isResolved': true}});
        } catch (error) {
            throw error;
        }
    }
// #endregion

    return {
        createNewReport,
        getReports,
        markAsResolved
    }
}
module.exports = reportService;