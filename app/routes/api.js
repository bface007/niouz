/**
 * Created by bface on 23/06/2015.
 */
// load required packages
var UserController = require('../controllers/user');
var PostController = require('../controllers/post');
var CategoryController = require('../controllers/category');

module.exports = function (app, express) {
    var router = express.Router();

    // USER MODEL ROUTES
    // ==============================================
    router.route('/users')
        .post(UserController.postUsers)
        .get(UserController.getUsers);

    router.route('/users/:user_id')
        .get(UserController.getUser);

    // == USER MODEL ROUTES == //

    // POST MODEL ROUTES
    // ==============================================

    // create endpoint /posts
    router.route('/posts')
        .post(PostController.createPosts)
        .get(PostController.getPosts);

    // create endpoint /posts/:post_id
    router.route('/posts/:post_id')
        .get(PostController.getPost);

    // == POST MODEL ROUTES == //

    // CATEGORY MODEL ROUTES
    // ===============================================

    // create endpoint /categories
    router.route('/categories')
        .get(CategoryController.getCategories)
        .post(CategoryController.postCategories);

    // create endpoint /categories/:category_id
    router.route('/categories/:category_id')
        .get(CategoryController.getCategory);

    return router;
};