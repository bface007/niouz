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
        if(err)
            handleError(err, res);

        res.json({ message: "New category added"})
    })
};

// create endpoint /categories for GET
exports.getCategories = function (req, res) {
    Category.find(function (err, categories) {
        if(err)
            handleError(err, res);

        res.json(categories);
    })
};

// create endpoint /categories/:category_id for GET
exports.getCategory = function (req, res) {
    Category.findOne({ _id: req.params.category_id}, function (err, category) {
        if(err)
            handleError(err, res);

        res.json(category);
    })
};

// create endpoint /categories/:category_id for PUT
exports.putCategory = function (req, res) {
    var category = {
        name: req.body.name,
        __parent: req.body.parent
    };
    // Use the Category model to find a specific one
    Category.update({ _id: req.params.category_id}, category, function (err, num, raw) {
        if(err)
            handleError(err, res);

        res.json({ message: num + ' category updated'});
    });
};

// create endpoint /category/:category_id for DELETE
exports.deleteCategory = function (req, res) {
    var cat_id = req.params.category_id;
    // Use the category model to find   a specific category and remove it
    Category.remove({ _id: cat_id}, function (err) {
        if(err)
            handleError(err, res);

        res.json( { message: cat_id +' category removed'});
    });
};

//
// ====================================================
function handleError(err, res){
    console.error(err);
    res.send(err);
}