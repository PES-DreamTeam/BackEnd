const { boolean } = require('joi');
const mongoose = require('mongoose');
const { Types } = require('ts-openapi');

const Report = new mongoose.Schema({
    type: {
        type: String,
        required: 'The type is required',
    },
    platform: {
        type: String,
        required: 'The platform is required',
    },
    os: {
        type: String,
        required: 'The os is required',
    },
    subject: {
        type: String,
        required: 'The subject is required',
    },
    details: {
        type: String,
        required: 'The details is required',
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isResolved: {
        type: Boolean,
        default: false,
    }
},
    {
    timestamps: true,
    }
);

module.exports = mongoose.model('Report', Report);