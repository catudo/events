'use strict';

var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
mongoose.set('useCreateIndex', true);

const options = {
    poolSize: 5,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms,
    keepAlive: true,
    useNewUrlParser: true
};

module.exports = {
    dbMaster: mongoose.createConnection('mongodb://catudo:3p51l0n2018*@127.0.0.1:27017/events', options, function (err, res) {
        if (err) {
            console.log('Error: connecting to Database ');
            process.exit(1);
        } else {
            console.log('Connected to Database ' );
        }
    })
};
