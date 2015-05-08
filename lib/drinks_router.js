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
    var fileToCheck = './data/drink-' + req.params.id + '.JSON';
    var replacementDrink = ('{"id": "' + req.params.id + '",\n "name": "' + req.body.name + '",\n"ingredients": "' + req.body.ingredients + '"}');
    fs.exists(fileToCheck, function (exists) {
      if (exists !== true) {
        return res.json({msg: 'file does not exist'});
      }
      fs.writeFile('./data/drink-' + req.params.id + '.JSON', replacementDrink, function (err, res) {
        if (err) {
          console.log(err);
          return res.json({msg: 'failed to replace file'});
        }
      });
      res.json({msg: fileToCheck + ' has been replaced'});
    });
  });

  router.delete('/drinks/:id', function (req, res) {
    var fileToDelete = './data/drink-' + req.params.id + '.JSON';
    fs.unlink(fileToDelete, function (err) {
      if (err) {
        return res.status(500).json({msg: 'server error'});
      }
      res.json({msg: 'removed file: ' + fileToDelete});
    });
  });
};

// {name: 'martini', ingredients: 'vodka'}
// {name: 'cape cod', ingredients: 'vodka and cranberry juice'}
