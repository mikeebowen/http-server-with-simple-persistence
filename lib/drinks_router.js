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
    // var idNumber = req.body.id || counter;
    if (req.body.id) {
      var idNumber = req.body.id;
    } else {
      idNumber = counter;
    }
    var newDrink = ('{"id": "' + idNumber + '",\n "name": "' + req.body.name + '",\n"ingredients": "' + req.body.ingredients + '"}');
    fs.writeFile('./data/drink-' + idNumber + '.JSON', newDrink, function (err, res) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'server error'});
      }
    });
    res.json({id: idNumber, name: req.body.name, ingredients: req.body.ingredients});
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

  router.patch('/drinks/:id', function (req, res) {
    fs.readFile('./data/drink-' + req.params.id + '.JSON', function (err, data) {
      if (err) {
        console.log(err);
      }
      var tmpDrink = JSON.parse(data.toString());
      var tmpJson;
      console.log('this should be tmpDrink');
      tmpDrink.name = req.body.name;
      tmpDrink.ingredients = req.body.ingredients;
      tmpJson = JSON.stringify(tmpDrink);
      console.log(tmpJson);
      fs.writeFile('./data/drink-' + req.params.id + '.JSON', tmpJson, function (err, res) {
        if (err) {
          console.log(err);
          res.json({msg: 'failed to edit file'});
        }
      })
      res.json({msg: 'file has been changed'})
    });
  })

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
