'use strict';


var mongoose = require('mongoose');

var drinkSchema = mongoose.Schema({
  name: String,
  ingredients: String
});

module.exports = mongoose.model('Drink', drinkSchema);
