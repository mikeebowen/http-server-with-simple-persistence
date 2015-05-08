'use strict';

var bodyparser = require('body-parser');
var fs = require('fs');
var path = require('path');
var counter = 0;

module.exports = function (router) {
  router.use(bodyparser.json());
  console.log('hello');

  router.get('/drinks', function (req, res) {
    fs.readdir('./data', function (err, files) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'server error'});
      }
      res.json(files);
      })
    });

  router.post('/drinks', function (req, res) {
    counter++;
    var newDrink = ('{"id": "' + counter + '",\n "name": "' + req.body.name + '",\n"ingredients": "' + req.body.ingredients + '"}');
    fs.writeFile('./data/drink-' + counter + '.JSON', newDrink, function (err, res) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'server error'});
      }
    });
    res.json({id: counter, name: req.body.name, ingredients: req.body.ingredients});
    console.log('post request sent');
  });
}

// {name: 'martini', ingredients: 'vodka'}
