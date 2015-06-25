/**
 * Created by bface on 22/06/2015.
 */
var mongoose = require('mongoose');
var URLSlugs = require('mongoose-url-slugs');
var relationship = require('mongoose-relationship');
var config = require('../../config');
var sanitizer = require('sanitizer');           // to remove

var PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true,
        select: false
    },
    content_filtered: {
        type: String
    },
    date: {
        created_at: { type: Date},
        updated_at: { type: Date}
    },
    excerpt: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: config.posts.status,
        default: config.posts.status[0]
    },
    comment_status: {
        type: String,
        enum: config.posts.comment_status,
        default: config.posts.comment_status[0],
        select: false
    },
    comment_count: {
        type: Number,
        default: 0
    },
    post_type: {
        type: String,
        enum: config.posts.types,
        default: config.posts.types[0]
    },
    __author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        childPath: "__posts",
        required: true
    },
    __categories:[{
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        childPath: "__posts",
        required: true
    }],
    __notes: [{
        type: mongoose.Schema.ObjectId,
        ref: "Note"
    }],
    __comments: [{
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
        select: false
    }],
    __attachments: [{
        type: mongoose.Schema.ObjectId,
        ref: "Media",
        select: false
    }],
    __cover: {
        type: mongoose.Schema.ObjectId,
        ref: "Media",
        required: true
    },
    __group: {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
        childPath: "__posts",
        default: null
    },
    __blacklist: [{
        type: mongoose.Schema.ObjectId,
        ref: "Blacklist",
        select: false
    }]
});

// Plugin Use
PostSchema.plugin(relationship, { relationshipPathName: "__author"});
PostSchema.plugin(relationship, { relationshipPathName: "__group"});
PostSchema.plugin(relationship, { relationshipPathName: "__categories"});
PostSchema.plugin(URLSlugs('title'));

// Before save Post item
PostSchema.pre('save', function(next){
    var post = this;
    // store dates
    var now = new Date();
    post.date.updated_at = now;
    if(!post.date.created_at)
        post.date.created_at = now;

    if(post.isModified('content')){
        // store sanitized content
        post.content = sanitizer.sanitize(this.content); // to replace with sanitize-html module

        // store content filtered
        post.content_filtered = post.content;
    }

    // store excerpt
    if(!this.excerpt)
        this.excerpt = config.makeExcerpt(this.content);
    next();
});

module.exports = mongoose.model('Post', PostSchema);