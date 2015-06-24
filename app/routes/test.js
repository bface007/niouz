/**
 * Created by bface on 21/06/2015.
 */

var testController = require('../controllers/test');

module.exports = function (app, express) {
    var testRouter = express.Router();                      // get an instance of the express router

    testRouter.get('/', testController.test);

    testRouter.get('/drop', testController.dropAllCollections);

    return testRouter;
};