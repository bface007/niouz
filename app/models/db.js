/**
 * Created by bface on 21/06/2015.
 */
var mongoose = require('mongoose');                 // call mongoose module
var config = require('../../config');               // call config file

// create the database connection
mongoose.connect(config.database_uri);

// DATABASE CONNECTION EVENTS
// ============================================

// when succesfully connected
mongoose.connection.on('connected', function () {
    console.log("Mongoose default connection open to "+ config.database_uri);
});

// if the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log("Mongoose default connection error: "+ err);
});

// when the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// if the node process ends, close the mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});