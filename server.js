'use strict';

var express = require('express');
var app = express();
var drinkRoutes = express.Router();
var bodyparser = require("body-parser");
var port = process.env.PORT || 3000;
var startTime = new Date();

// app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.send('This should be the root')
});

app.listen(port, function () {
  console.log('The server was started on: ' + startTime + ' on port ' + port);
});
