/**
 * Created by bface on 23/06/2015.
 */
// load required packages
var Category = require('../models/category');

// create endpoint /categories for POST
exports.postCategories = function (req, res) {
    var category = new Category({
        name : req.body.name,
        __creator: req.body.author
    });

    category.save(function (err) {
        if(err){
            console.error(err);
            res.send(err);
        }

        res.json({ message: "New category added"})
    })
};

// create endpoint /categories for GET
exports.getCategories = function (req, res) {
    Category.find(function (err, categories) {
        if(err){
            console.error(err);
            res.send(err);
        }

        res.json(categories);
    })
};

// create endpoint /categories/:category_id for GET
exports.getCategory = function (req, res) {
    Category.findOne({ _id: req.params.category_id}, function (err, category) {
        if(err){
            console.error(err);
            res.send(err);
        }

        res.json(category);
    })
};