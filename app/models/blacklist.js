/**
 * Created by bface on 24/06/2015.
 */
// load required packages
var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
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
        required: true,
        childPath: "__blacklist"
    },
    __post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        required: true,
        childPath: "__blacklist"
    }
});

// Plugin stuff
BlacklistSchema.plugin(relationship, {relationshipPathName: "__creator"});
BlacklistSchema.plugin(relationship, { relationshipPathName: "__post"});

BlacklistSchema.pre('save', function (next) {
    var blacklist = this;

    // store dates
    var now = new Date();
    blacklist.date.updated_at = now;
    if(!blacklist.date.created_at)
        blacklist.date.created_at = now;

    next();
});

module.exports = mongoose.model('Blacklist', BlacklistSchema);