'use strict';

var fs = require('fs');
var bodyparser = require('body-parser');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

require('../server.js');


describe('Test that pages load', function () {
  it('Should have status 200', function (done) {
    chai.request('localhost:3000')
    .get('/')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    })
  })
})

describe('Test Requests', function () {
  it('Should create a new drink with POST request', function (done) {
    chai.request('localhost:3000')
    .post('/api/drinks')
    .send({id: 0, name: 'martini', ingredients: 'vodka'})
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.body.id).to.eql(1);
      expect(res.body.name).to.eql('martini');
      expect(res.body.ingredients).to.eql('vodka');
      done();
    })
  });

  it('Should respond to GET Request with list of drink files',  function (done) {
    chai.request('localhost:3000')
    .get('/api/drinks')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    })
  });

  before(function (done) {
    fs.writeFile('./data/drink-0.JSON', function (err, res) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'server error'});
      }
    })
    done();
  });

  it('Should delete a file', function (done) {
    chai.request('localhost:3000')
    .del('/api/drinks/0')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('removed file: ./data/drink-0.JSON');
      done();
    })
  })
})
