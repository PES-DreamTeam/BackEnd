const {Schema, model} = require('mongoose');

const ReportStation = new Schema({
    station_id: {
        type: Number,
    },
    reports: [{
        reportType: String,
        reportMsg: String,
        stationId: String,
        stationType: String,
        date: Date,
        userName: String,
        user_id: Schema.Types.ObjectId,
        isResolved: {
            type: Boolean,
            default: false,
        }
    }]
});

ReportStation.index({station_id:1} , { unique: true });

module.exports = model('ReportStation', ReportStation);