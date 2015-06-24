/**
 * Created by bface on 21/06/2015.
 */
//server.js

// BASE SETUP
// ==================================================

// call the packages we need
var express = require('express');                           // call express
var app = express();                                        // define our app using express
var bodyParser = require('body-parser');                    // call body-parser middleware
var logger = require('morgan');                             // call morgan logger
var subdomain = require('express-subdomain');               // call express-subdomain middleware

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true}));          // parse URL-encoded with the qs library
app.use(bodyParser.json());

// log
app.use(logger('dev'));


// DATABASE LAUNCH
// ==================================================
require('./app/models/db');

// ROUTES FOR OUR API
// ==================================================
var testRoute = require('./app/routes/test')(app, express);
var apiRoute = require('./app/routes/api')(app, express);

// REGISTER ALL ROUTES
// ==================================================
app.use(subdomain('api', apiRoute));
app.use('/', testRoute);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// ERROR HANDLERS
// ===================================================

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
