/**
 * Created by bface on 24/06/2015.
 */
// load required packages
var mongoose = require('mongoose');
var config = require('../../config');

var BlacklistSchema = new mongoose.Schema({
    details: String,
    date: {
        created_at: Date,
        updated_at: Date
    },
    status: {
        type: String,
        enum: config.blacklist.status,
        default: config.blacklist.status[0]
    },
    __creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});


module.exports = mongoose.model('Blacklist', BlacklistSchema);