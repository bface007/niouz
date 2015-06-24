/**
 * Created by bface on 23/06/2015.
 */
// load required packages
var Post = require('../models/post');

// create endpoint /posts for POST
exports.createPosts = function (req, res) {
    var post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });
    
    post.save(function (err) {
        if(err){
            console.error(err);
            res.send(err);
        }
        
        res.json({ message: "New post added"})
    })
};

// create endpoint /posts for GET
exports.getPosts = function (req, res) {
    Post.find().populate('author').exec(function (err, posts) {
        if(err){
            console.error(err);
            req.send(err);
        }

        res.json(posts);
    });
};

// create endpoint /posts/:post_id for GET
exports.getPost = function (req, res) {
    Post.findOne({ _id: req.params.post_id}, function (err, post) {
        if(err){
            console.error(err);
            res.send(err);
        }

        res.json(post)
    });
}