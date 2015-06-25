/**
 * Created by bface on 25/06/2015.
 */
var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
var config = require('../../config');

var ReportSchema = new mongoose.Schema({
    details: [],
    date: {
        created_at: Date,
        updated_at: Date
    },
    status: {
        type: String,
        enum: config.reports.status,
        default: config.reports.status[0]
    },
    __creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        childPath: "__reports"
    },
    __to: {
        __id: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        __type: {
            type: String,
            enum: config.reports.types,
            default: config.reports.types[0]
        }
    }
});

ReportSchema.plugin(relationship, { relationshipPathName: "__creator"});

ReportSchema.pre('save', function (next) {
    var report = this;

    // store dates
    var now = new Date();
    report.date.updated_at = now;
    if(!report.date.created_at)
        report.date.created_at = now;

    next();
});

module.exports = mongoose.model('Report', ReportSchema);