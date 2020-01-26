// REQUIRE ALL THE LIBRARIES
// =============================================================================
var express = require('express');

var app = express();
var dbs = require('./dbs');
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '16mb'}));
app.use(bodyParser.urlencoded({extended: true}));




app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

    // Pass to next layer of middleware
    next();
});



//-------------------- ROUTES --------------------------------------
const userRoute = require("./controllers/users_controller")(dbs);
app.use('/api', userRoute);
//-------------------- ---------------------------------------------

app.use("/api", function (err, req, res, next) {
    // send back json data
    res.send(err);
});


app.listen(8080,'127.0.0.1',  function () {
    console.log('events application listen at 8080');
});

