'use strict';

var express = require('express');
var app = express();
var drinkRoutes = express.Router();
var port = process.env.PORT || 3000;
var startTime = new Date();

require('./lib/drinks_router.js')(drinkRoutes);
app.use('/api', drinkRoutes);

app.get('/', function (req, res) {
  res.send('This should be the root');
});

app.listen(port, function () {
  console.log('The server was started on: ' + startTime + ' on port ' + port);
});
