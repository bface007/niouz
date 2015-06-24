/**
 * Created by bface on 21/06/2015.
 */
// load required packages
var User = require('../models/user');

// create endpoint /users for POST
exports.postUsers = function (req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err) {
        if(err){
            console.error(err);
            return res.send(err);
        }

        res.json({ message: "User with username "+ user.username +" has been created"})
    })
};

// create endpoint /users for GET
exports.getUsers = function (req, res) {
    User.find(function (err, users) {
        if(err){
            console.error(err);
            res.send(err);
        }

        res.json(users);
    });
};

// create endpoint /users/:user_id for GET
exports.getUser = function (req, res) {
    User.findOne({ _id: req.params.user_id}, function (err, user) {
        if(err){
            console.error(err);
            res.send(err);
        }

        res.json(user);
    });
};