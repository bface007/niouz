/**
 * Created by bface on 25/06/2015.
 */
var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
var config = require('../../config');

var AdSchema = new mongoose.Schema({
    delay: {
        start: Date,
        end: Date
    },
    date: {
        created_at: Date,
        updated_at: Date
    },
    __type: {
        type: String,
        enum: config.ads.types,
        default: config.ads.types[0]
    },
    __post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        required: true
    },
    __creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        childPath: "__ads"
    }
});

AdSchema.plugin(relationship, { relationshipPathName: "__creator"});

AdSchema.pre('save', function(next){
    var ad = this;

    // store dates
    var now = new Date();
    ad.date.updated_at = now;
    if(!ad.date.created_at)
        ad.date.created_at = now;

    next();
});

module.exports = mongoose.model('Advertising', AdSchema);