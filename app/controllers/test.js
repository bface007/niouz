/**
 * Created by bface on 21/06/2015.
 */
var mongoose = require('mongoose');
var config = require('../../config');
var sanitizeHtml = require('sanitize-html');

exports.test = function(req, res){
    var content = "<a></a><p class='dropcap'>Super p avec fuck</p><a href='http://example.com/' onclick='a'>lien</a> your fuckin head <span onclick='alert(\'tre\')'> tret</span>teur <img src='ef' onclick='alert()'>";


    res.json({
        message: sanitizeHtml(content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'span']),
            exclusiveFilter: function (frame) {
                return frame.tag === 'a' && !frame.text.trim();
            }
        })
    });
};

exports.dropAllCollections = function (req, res) {
    for(collection in mongoose.connection.collections){
        mongoose.connection.collections[collection].drop(function (err) {
            if(err)
                console.error(err);

            console.log(collection + " dropped");
        });
    }
};
