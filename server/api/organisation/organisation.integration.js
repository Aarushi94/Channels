'use strict';

var app = require('../..');
import request from 'supertest';

var newOrganisation;

describe('Organisation API:', function() {
  describe('GET /api/organisations', function() {
    var organisations;

    beforeEach(function(done) {
      request(app)
        .get('/api/organisations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          organisations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(organisations).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/organisations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/organisations')
        .send({
          name: 'New Organisation',
          info: 'This is the brand new organisation!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newOrganisation = res.body;
          done();
        });
    });

    it('should respond with the newly created organisation', function() {
      expect(newOrganisation.name).to.equal('New Organisation');
      expect(newOrganisation.info).to.equal('This is the brand new organisation!!!');
    });
  });

  describe('GET /api/organisations/:id', function() {
    var organisation;

    beforeEach(function(done) {
      request(app)
        .get(`/api/organisations/${newOrganisation._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          organisation = res.body;
          done();
        });
    });

    afterEach(function() {
      organisation = {};
    });

    it('should respond with the requested organisation', function() {
      expect(organisation.name).to.equal('New Organisation');
      expect(organisation.info).to.equal('This is the brand new organisation!!!');
    });
  });

  describe('PUT /api/organisations/:id', function() {
    var updatedOrganisation;

    beforeEach(function(done) {
      request(app)
        .put(`/api/organisations/${newOrganisation._id}`)
        .send({
          name: 'Updated Organisation',
          info: 'This is the updated organisation!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedOrganisation = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOrganisation = {};
    });

    it('should respond with the original organisation', function() {
      expect(updatedOrganisation.name).to.equal('New Organisation');
      expect(updatedOrganisation.info).to.equal('This is the brand new organisation!!!');
    });

    it('should respond with the updated organisation on a subsequent GET', function(done) {
      request(app)
        .get(`/api/organisations/${newOrganisation._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let organisation = res.body;

          expect(organisation.name).to.equal('Updated Organisation');
          expect(organisation.info).to.equal('This is the updated organisation!!!');

          done();
        });
    });
  });

  describe('PATCH /api/organisations/:id', function() {
    var patchedOrganisation;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/organisations/${newOrganisation._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Organisation' },
          { op: 'replace', path: '/info', value: 'This is the patched organisation!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedOrganisation = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedOrganisation = {};
    });

    it('should respond with the patched organisation', function() {
      expect(patchedOrganisation.name).to.equal('Patched Organisation');
      expect(patchedOrganisation.info).to.equal('This is the patched organisation!!!');
    });
  });

  describe('DELETE /api/organisations/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/organisations/${newOrganisation._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when organisation does not exist', function(done) {
      request(app)
        .delete(`/api/organisations/${newOrganisation._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
