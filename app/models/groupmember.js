/**
 * Created by bface on 25/06/2015.
 */
var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
var config = require('../../config');

var GroupMemberSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: config.groupmembers.roles,
        default: config.groupmembers.roles[0]
    },
    date: {
        created_at: Date,
        updated_at: Date
    },
    status: {
        type: String,
        enum: config.groupmembers.status,
        default: config.groupmembers.status[0]
    },
    __link_to: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        childPath: "__membership"
    },
    __group: {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
        required: true,
        childPath: "__members"
    }
});

GroupMemberSchema.plugin(relationship, { relationshipPathName: "__link_to"});
GroupMemberSchema.plugin(relationship, { relationshipPathName: "__group"});

GroupMemberSchema.pre('save', function (next) {
    var groupMember = this;

    // store dates
    var now = new Date();
    groupMember.date.updated_at = now;
    if(!groupMember.date.created_at)
        groupMember.date.created_at = now;

    next();
});

module.exports = mongoose.model('Group', GroupMemberSchema);