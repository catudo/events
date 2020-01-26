'use strict';

var express = require('express');
var router = express.Router();

module.exports = function (dbs) {
    var User = require('../models/user')(dbs);
    //POST - /users/signup
     var signup = function(req, res, next) {
         var email = req.body.email;
         var promise = User.findOne({email: email}).exec();
         promise.then(function (user) {
             return user;
         }).then(function (user) {
             var newUser = new User(req.body);
             newUser.save().then(function (user_saved) {
                 return next({saved:true});
             }).catch(function (err) {
                 if (err.errorCode === 422) {
                     var responseError = {};
                     responseError.statusCode = err.errorCode;
                     responseError.validationErrors = [{
                         keyword: err.name,
                         message: err.message
                     }];
                     res.status(422).json(responseError)
                 } else {
                     return next(err);
                 }
             });
         })
    }

    router.post('/users/signup',  signup);

     return router;

}
