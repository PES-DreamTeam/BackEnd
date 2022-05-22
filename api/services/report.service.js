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
        else {
            data = await getStationReports();
            data = await data.concat(await getAppReports());
        }
        return data;
    }

    const getStationReports = async () => {
        let reports = await ReportStations.find();
        reports = reports.filter(r => r.reports.length > 0);
        let resolvedReports =[]; 
        let unresolvedReports = [];
        reports.forEach(station => {
            const resolved = fitReports(true, station); 
            resolvedReports = resolvedReports.concat(resolved);
            const unresolved = fitReports(false, station);
            unresolvedReports = unresolvedReports.concat(unresolved);
        })
        return {resolvedReports, unresolvedReports};
    }

    const fitReports = (getResolved, station) => {
        return station.reports.map(report => {
                if(getResolved && report.isResolved){
                    return returnReportFormatted(report, station); 
                }
                else if(!getResolved && !report.isResolved){
                    return returnReportFormatted(report, station);        
                }
            }).filter(x => x !== undefined);
    }
    const returnReportFormatted = (report, station) => {
        return {
            reportType: report.reportType,
            reportMsg: report.reportMsg,
            date: report.date,
            userName: report.userName,
            isResolved: report.isResolved,
            reportId: report._id,
            stationId: station.station_id
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
                userId: report.user_id,
                date: report.createdAt,
                isResolved: report.isResolved,
                createdAt: report.createdAt,
                reportId: report._id,
            }
        }))
        let resolvedReports = reports.filter(r => r.isResolved);
        let unresolvedReports = reports.filter(r => !r.isResolved);
        return {resolvedReports, unresolvedReports};
    }
    const markAsResolved = async (stationId, reportId, reportType) => {
        if(reportType === 'station'){
            return await markStationAsResolved(stationId, reportId);
        }else if(reportType === 'app'){
            return await markAppAsResolved(reportId);
        }
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


    return {
        createNewReport,
        getReports,
        markAsResolved
    }
}
module.exports = reportService;