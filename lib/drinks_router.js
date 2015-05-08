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

  router.put('/drinks/:id', function (req, res) {
    var file = './data/drink-' + req.params.id + '.JSON';
    console.log(file);
    fs.readFile(file, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'server error'});
      }
      JSON.parse(data);
      res.json(data);
    });
  });

  router.delete('/drinks/:id', function (req, res) {
    var fileToDelete = './data/drink-' + req.params.id + '.JSON';
    fs.unlink(fileToDelete, function (err) {
      if (err) {
        return res.status(500).json({msg: 'server error'});
      }
      res.json({msg: 'removed file: ' + fileToDelete});
      res.end();
    });
  });
};

// {name: 'martini', ingredients: 'vodka'}
