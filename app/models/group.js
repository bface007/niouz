/**
 * Created by bface on 25/06/2015.
 */
var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
var URLSlugs = require('mongoose-url-slugs');
var config = require('../../config');

var GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        created_at: Date,
        updated_at: Date
    },
    status: {
        type: String,
        enum: config.groups.status,
        default: config.groups.status[0]
    },
    __type: {
        type: String,
        enum: config.groups.types,
        default: config.groups.types[0]
    },
    medias: {
        __cover: {
            type: mongoose.Schema.ObjectId,
            ref: "Media"
        }
    },
    __creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        childPath: "__groups"
    },
    __posts: [{
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        unique: true
    }],
    __members: [{
        type: mongoose.Schema.ObjectId,
        ref: "GroupMember",
        unique: true,
        required: true
    }]
});

GroupSchema.plugin(URLSlugs('name'));
GroupSchema.plugin(relationship, { relationshipPathName: "__creator"});

GroupSchema.pre('save', function (next) {
    var group = this;

    // store dates
    var now = new Date();
    group.date.updated_at = now;
    if(!group.date.created_at)
        group.date.created_at = now;

    next();
});

module.exports = mongoose.model('Group', GroupSchema);