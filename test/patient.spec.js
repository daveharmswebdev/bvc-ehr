'use strict'

const chai = require('chai')
const should = chai.should
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../server/server')
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

chai.use(chaiHttp)

describe('patient routes', () => {

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

  it('should return all patients', (done) => {
    chai
      .request(app)
      .get('/api/patient')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json // jshint ignore:line
        res.body.should.be.a('array')
        res.body.length.should.equal(1)
        res.body[0].patient_id.should.equal(1)
        res.body[0].last_name.should.equal('White')
        res.body[0].first_name.should.equal('Barry')
        res.body[0].middle_initial.should.equal('O')
        res.body[0].street_address.should.equal('2600 Anywhere Street')
        res.body[0].city.should.equal('Knoxville')
        res.body[0].state.should.equal('TN')
        res.body[0].zip.should.equal('37901')
        done()
      })
  })

  it('should patient by id', (done) => {
    chai
      .request(app)
      .get('/api/patient/1')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json // jshint ignore:line
        res.body.should.be.a('object')
        res.body.patient_id.should.equal(1)
        res.body.last_name.should.equal('White')
        res.body.first_name.should.equal('Barry')
        res.body.middle_initial.should.equal('O')
        res.body.street_address.should.equal('2600 Anywhere Street')
        res.body.city.should.equal('Knoxville')
        res.body.state.should.equal('TN')
        res.body.zip.should.equal('37901')
        done()
      })
  })

  it('should post a new patient(admit a new patient', done => {
    chai
      .request(app)
      .post('/api/patient')
      .send({
        "patient_id":"2",
        "last_name":"Brown",
        "first_name":"James",
        "middle_initial":"K",
        "birth_date":"1963-10-10",
        "street_address":"123 street street",
        "city":"Nashville",
        "state":"TN",
        "zip":"37215"
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json // jshint ignore:line
        res.body.should.be.a('object')
        res.body.patient_id.should.equal(2)
        res.body.last_name.should.equal('Brown')
        res.body.first_name.should.equal('James')
        res.body.middle_initial.should.equal('K')
        res.body.street_address.should.equal('123 street street')
        res.body.city.should.equal('Nashville')
        res.body.state.should.equal('TN')
        res.body.zip.should.equal('37215')
        done()
      })
  })

  it('should update a patient with new information', done => {
    chai
      .request(app)
      .put('/api/patient/1')
      .send({
        "state":"KY",
        "zip":"88888"
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json // jshint ignore:line
        res.body.should.be.a('object')
        res.body.patient_id.should.equal(1)
        res.body.last_name.should.equal('White')
        res.body.first_name.should.equal('Barry')
        res.body.middle_initial.should.equal('O')
        res.body.street_address.should.equal('2600 Anywhere Street')
        res.body.city.should.equal('Knoxville')
        res.body.state.should.equal('KY')
        res.body.zip.should.equal('88888')
        done()        
      })
  })    

})













