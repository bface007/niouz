/**
 * Created by bface on 24/06/2015.
 */
var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
var config = require('../../config');

var CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: config.comments.status,
        default: config.comments.status[0]
    },
    date: {
        created_at: Date,
        updated_at: Date
    },
    isSpam: Boolean,
    __votes: [{
        type: mongoose.Schema.ObjectId,
        ref: "Vote",
        unique: true
    }],
    __author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    __post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        required: true,
        childPath: "__comments"
    },
    __parent: {
        type: mongoose.Schema.ObjectId,
        ref: "Comment"
    }
});

CommentSchema.plugin(relationship, { relationshipPathName: "__post"});

CommentSchema.pre('save', function (next) {
    var comment = this;

    // store dates
    var now = new Date();
    comment.date.updated_at = now;
    if(!comment.date.created_at)
        comment.date.created_at = now;

    next();
});

module.exports = mongoose.model('Comment', CommentSchema);