/**
 * Created by bface on 24/06/2015.
 */
// load required packages
var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

var NoteSchema = new mongoose.Schema({
    value: {
        required: true,
        type: Number,
        min: 1,
        max: 5
    },
    date: {
        created_at: Date,
        updated_at: Date
    },
    __post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        required: true,
        childPath: "__notes"
    },
    __creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        childPath: "__notes"
    }
});

NoteSchema.plugin(relationship, { relationPathName: "__post"});
NoteSchema.plugin(relationship, { relationPathName: "__creator"});

NoteSchema.pre('save', function (next) {
    var note = this;

    // store dates
    var now = new Date();
    note.date.updated_at = now;
    if(!note.date.created_at)
        note.date.created_at = now;

    next();
});


module.exports = mongoose.model('Note', NoteSchema);