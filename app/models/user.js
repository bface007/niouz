/**
 * Created by bface on 21/06/2015.
 */

// load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var config = require('../../config');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        select: false
    },
    display_name: {
        type: String
    },
    firstname: {
        type: String,
        select: false
    },
    lastname: {
        type: String,
        select: false
    },
    sex: {
        type: String,
        enum: [ 'm', 'f'],
        select: false
    },
    status: {
        type: String,
        enum: config.users.status,
        default: config.users.status[0]
    },
    activation_key: String,
    birthday: Date,
    description: String,
    registered: Date,
    last_connection: Date,
    roles: [{
        type: String,
        enum: config.users.roles,
        default: config.users.roles[0]
    }],
    __posts: [{
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        select: false
    }],
    __groups: [{
        type: mongoose.Schema.ObjectId,
        ref: "Group",
        select: false
    }],
    __blacklist: [{
        type: mongoose.Schema.ObjectId,
        ref: "Blacklist",
        select: false
    }],
    __comments: [{
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
        select: false
    }],
    __notes: [{
        type: mongoose.Schema.ObjectId,
        ref: "Note",
        select: false
    }],
    __membership: [{
        type: mongoose.Schema.ObjectId,
        ref: "GroupMember",
        select: false
    }],
    __reports: [{
        type: mongoose.Schema.ObjectId,
        ref: "Report",
        select: false
    }],
    __ads: [{
        type: mongoose.Schema.ObjectId,
        ref: "Advertising",
        select: false
    }],
    __medias: {
        all: [{
            type: mongoose.Schema.ObjectId,
            ref: "Media",
            select: false
        }],
        avatar: {
            type: mongoose.Schema.ObjectId,
            ref: "Media"
        },
        cover: {
            type: mongoose.Schema.ObjectId,
            ref: "Media"
        }
    }
});

// execute before each user.save() call
UserSchema.pre('save', function (callback) {
    var user = this;
    var now = new Date();

    if(!user.display_name)
        user.display_name = user.username;

    if(!user.registered)
        user.registered = now;

    // break out if the password hasn't changed
    if(!user.isModified('password')) return callback();

    // password changed so we need to hash it
    bcrypt.genSalt(5, function (err, salt) {
        if(err) return callback(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if(err) return callback(err);

            user.password = hash;
            callback();
        });
    });
});

UserSchema.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);