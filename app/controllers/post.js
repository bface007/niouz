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
        if(err)
            handleError(err, res);
        
        res.json({ message: "New post added"})
    })
};

// create endpoint /posts for GET
exports.getPosts = function (req, res) {
    Post.find().populate('author').exec(function (err, posts) {
        if(err)
            handleError(err, res);

        res.json(posts);
    });
};

// create endpoint /posts/:post_id for GET
exports.getPost = function (req, res) {
    Post.findOne({ _id: req.params.post_id}, function (err, post) {
        if(err)
            handleError(err, res);

        res.json(post)
    });
};

// create endpoint /posts/:post_id for PUT
exports.putPost = function (req, res) {
    var post = {
        title: req.params.title,
        content: req.params.content
    };
    Post.update({ _id: req.params.post_id}, post, function (err, num, raw) {
        if(err)
            handleError(err, res);

        res.json({ message: num +" post updated"});
    });
};

// create endpoint /posts/:post_id for DELETE
exports.deletePost = function (req, res) {
    var post_id = req.params.post_id;

    Post.remove({ _id: post_id}, function (err) {
        if(err)
            handleError(err, res);

        res.json({ message: post_id +" post removed"});
    });
}

//
// ====================================================
function handleError(err, res){
    console.error(err);
    res.send(err);
}