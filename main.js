// REQUIRE ALL THE LIBRARIES
// =============================================================================
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

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


app.listen(8080,'127.0.0.1',  function () {
    console.log('events application listen at 8080');
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});
