'use strict';

var express = require('express');
var router = express.Router();

module.exports = function (dbs) {
    var User = require('../models/user')(dbs);
    //POST - /users/signup
     var signup = function(req, res, next) {
         var email = req.body.email_register;
         var promise = User.findOne({email: email}).exec();
         promise.then(function (user) {
             return user;
         }).then(function (user) {
             var newUser = new User({email:email,names: req.body.names,password:req.body.password_register});
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

    //POST - /login
    var login = function (req, res, next) {
        User.findOne({email: req.body.email})
            .then(function (user) {
                if (!user) {
                    return next( {error: 'user.not.exists'});
                }
                user.validPassword(req.body.password, function (err, result) {
                        if (err) {
                            return next({allowed: false});
                        }
                        if (result) {
                            return next({allowed: true, id:user.id});
                        } else {
                            return next({allowed: false});
                        }
                    }
                );
            }).catch(function (err) {
            return next({allowed: false});
        });
    };

    router.post('/users/signup',  signup);
    router.post('/users/login',  login);

     return router;

}
