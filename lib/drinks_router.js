'use strict';

var bodyparser = require('body-parser');

module.exports = function (router) {
  console.log('hello');
  router.get('/test', function (req, res) {
    res.send('hello world');
  });
}
