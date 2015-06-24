/**
 * Created by bface on 23/06/2015.
 */
var mongoose = require('mongoose');
var URLSlugs = require('mongoose-url-slugs');
var relationship = require('mongoose-relationship');

var CategorySchema = new mongoose.Schema({
    __creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        select: false
    },
    __posts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        select: false
    }],
    __parent: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    date: {
        created_at: Date,
        updated_at: Date
    }
});

CategorySchema.plugin(URLSlugs('name'));


CategorySchema.pre('save', function(next){
    var now = new Date();
    this.date.updated_at = now;
    if(!this.date.created_at)
        this.date.created_at = now;

    if(this.__parent == this._id)
        this.__parent = null;

    next();
});


module.exports = mongoose.model('Category', CategorySchema);