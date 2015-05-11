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
    });
  });
});

describe('Test Requests', function () {

  it('POST should create a new drink file', function (done) {
    chai.request('localhost:3000')
    .post('/api/drinks')
    .send({id: 'test', name: 'martini', ingredients: 'vodka'})
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.body.id).to.eql('test');
      expect(res.body.name).to.eql('martini');
      expect(res.body.ingredients).to.eql('vodka');
      done();
    });
  });

  it('GET request should respond with a list of drink files',  function (done) {
    chai.request('localhost:3000')
    .get('/api/drinks')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('PUT should replace a file only if it already exists', function (done) {
    chai.request('localhost:3000')
    .put('/api/drinks/blah')
    .send({name: 'whiskey', ingredients: 'brown liquor'})
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('file does not exist');
      done();
    });
  });

  it('PUT should replace an existing file', function (done) {
    chai.request('localhost:3000')
    .put('/api/drinks/test')
    .send({name: 'cuba libre', ingredients: 'rum and coke with a lime'})
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('./data/drink-test.JSON has been replaced');
    });
    done();
  });

  it('PATCH should edit a file', function (done) {
    chai.request('localhost:3000')
    .patch('/api/drinks/test')
    .send({name: 'Long Island', ingredients: 'lots of booze'})
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('drink-test.JSON' + ' has been changed');
      done();
    })
  })

  it('DELETE Should delete a file', function (done) {
    chai.request('localhost:3000')
    .del('/api/drinks/test')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('removed file: ./data/drink-test.JSON');
      done();
    });
  });
})
