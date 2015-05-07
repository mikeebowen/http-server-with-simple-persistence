'use strict';

var express = require('express');
var app = express();
var drinkRoutes = express.Router();
var bodyparser = require("body-parser");
var fs = require('fs');
var port = process.env.PORT || 3000;
var startTime = new Date();

// app.use(express.static(__dirname));

app.get('/', function (req, res) {
  // res.writeHead(200, {'Content-Type': 'application/json'});
  res.send('This should be the root');
  // res.end();
});



app.listen(port, function () {
  console.log('The server was started on: ' + startTime + ' on port ' + port);
});
