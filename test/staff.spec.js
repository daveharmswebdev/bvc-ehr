'use strict'

const chai = require('chai')
const should = chai.should
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../server/server')
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

chai.use(chaiHttp)

describe('staff routes', () => {

	beforeEach( done => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() => {
          done()
        })
      })
    })
  })

  afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      done();
    });
  });

  it('should return all staff members', (done) => {
    chai
      .request(app)
      .get('/api/staff')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json // jshint ignore:line
        res.body.should.be.a('array')
        res.body.length.should.equal(3)
        res.body[0].user_id.should.equal(1)
        res.body[0].last_name.should.equal('Harms')
        res.body[0].first_name.should.equal('Walter')
        res.body[0].middle_initial.should.equal('D')
        res.body[0].role.should.equal('manager')
        res.body[0].security_level.should.equal(3)
        done()
      })
  })

  it('should get staff by id', (done) => {
    chai
      .request(app)
      .get('/api/staff/1')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json // jshint ignore:line
        res.body.should.be.a('object')
        res.body.user_id.should.equal(1)
        res.body.last_name.should.equal('Harms')
        res.body.first_name.should.equal('Walter')
        res.body.middle_initial.should.equal('D')
        res.body.role.should.equal('manager')
        res.body.security_level.should.equal(3)
        done()
      })
  })

  it('should post a new staff member', done => {
    chai
      .request(app)
      .post('/api/staff')
      .send({
        "user_id":"4",
        "last_name":"Thomas",
        "first_name":"David",
        "middle_initial":"B",
        "role":"tech",
        "security_level":1
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json // jshint ignore:line
        res.body.should.be.a('object')
        res.body.user_id.should.equal(4)
        res.body.last_name.should.equal('Thomas')
        res.body.first_name.should.equal('David')
        res.body.middle_initial.should.equal('B')
        res.body.role.should.equal('tech')
        res.body.security_level.should.equal(1)
        done()
      })
  })

  it('should update a staff member', done => {
    chai
      .request(app)
      .put('/api/staff/2')
      .send({
        "last_name":"Jones",
        "role":"supervisor",
        "security_level":3
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json // jshint ignore:line
        res.body.should.be.a('object')
        res.body.user_id.should.equal(2)
        res.body.last_name.should.equal('Jones')
        res.body.first_name.should.equal('Maggie')
        expect(res.body.middle_initial).to.be.null // jshint ignore:line
        res.body.role.should.equal('supervisor')
        res.body.security_level.should.equal(3)
        done()
      })
  })    

})













