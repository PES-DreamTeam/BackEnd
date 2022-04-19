const {Schema, model} = require('mongoose');

const ReportStation = new Schema({
    station_id: {
        type: Number,
    },
    reports: [{
        reportType: String,
        reportMsg: String
    }]
});

ReportStation.index({station_id:1} , { unique: true });

module.exports = model('ReportStation', ReportStation);