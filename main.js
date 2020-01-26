// REQUIRE ALL THE LIBRARIES
// =============================================================================
var express = require('express');

var app = express();
var dbs = require('./dbs');
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '16mb'}));
app.use(bodyParser.urlencoded({extended: true}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});


//-------------------- ROUTES --------------------------------------
const userRoute = require("./controllers/users_controller")(dbs);
app.use('/api', userRoute);

const eventRoute = require("./controllers/events_controller")(dbs);
app.use('/api', eventRoute);

//-------------------- ---------------------------------------------

app.use("/api", function (err, req, res, next) {
    // send back json data
    res.send(err);
});


app.listen(8080,'0.0.0.0',  function () {
    console.log('events application listen at 8080');
});

