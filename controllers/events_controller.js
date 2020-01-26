'use strict';

var express = require('express');
var router = express.Router();

module.exports = function (dbs) {
    var Event = require('../models/event')(dbs);
    //POST - /event/save_update_event
    var save_update_event = function(req, res, next) {
            Event.findById( req.body.id).then(function (event) {
                if(!event){
                    event = new Event(req.body)
                    event.save().then(function () {
                        return next({saved:true});
                    }).catch(function (err) {
                        return next({error:err});
                    })
                }else {
                    Event.update({_id:req.body.id }, req.body).then(function () {
                        return next({updated:true});
                    }).catch(function (err) {
                        return next({error:err});
                    })
                }

            }).catch(function (err) {
                return next({error:err});
            })

    }
    router.post('/event/save_update_event',  save_update_event);
    return router;

}
