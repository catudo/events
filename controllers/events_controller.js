'use strict';

var express = require('express');
var router = express.Router();

module.exports = function (dbs) {
    var Event = require('../models/event')(dbs);
    //POST - /event/save_update_event
    var save_update_event = function(req, res, next) {
        if (req.body.id.trim().length ==0){
           var event = new Event(req.body)
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

    }



    var list_events = function(req, res, next) {
        var event_promise = Event.find({}).sort({start_date: 'descending'}).exec();
        event_promise.then(function (events) {
            return next(events);
        })
    }
    router.post('/event/save_update_event',  save_update_event);
    router.post('/event/list_events',  list_events);
    return router;

}
