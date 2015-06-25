/**
 * Created by bface on 25/06/2015.
 */
var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

var MediaSchema = new mongoose.Schema({
    name: String,
    details: [],
    date: {
        created_at: Date,
        updated_at: Date
    },
    __creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        childPath: "__media.all"
    }
});

MediaSchema.plugin(relationship, { relationshipPathName: "__creator"});

MediaSchema.pre('save', function (next) {
    var media = this;

    // store dates
    var now = new Date();
    media.date.updated_at = now;
    if(!media.date.created_at)
        media.date.created_at = now;

    next();
});

module.exports = mongoose.model('Media', MediaSchema);