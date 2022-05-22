const {Schema, model} = require('mongoose');

const ReportStation = new Schema({
    station_id: {
        type: Number,
    },
    reports: [{
        reportType: String,
        reportMsg: String,
        stationId: String,
        date: Date,
        userName: String,
        isResolved: {
            type: Boolean,
            default: false,
        }
    }]
});

ReportStation.index({station_id:1} , { unique: true });

module.exports = model('ReportStation', ReportStation);