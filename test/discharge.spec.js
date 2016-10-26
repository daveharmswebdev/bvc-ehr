'use strict'

const chai = require('chai')
const should = chai.should
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../server/server')
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

chai.use(chaiHttp)

describe('discharge routes', () => {

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

  it('should return all discharges', (done) => {
    chai
      .request(app)
      .get('/api/discharge')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json // jshint ignore:line
        res.body.should.be.a('array')
        res.body.length.should.equal(1)
        res.body[0].discharge_id.should.equal(1)
        res.body[0].admission_id.should.equal(1)
        res.body[0].discharge_rn.should.equal(1)
        res.body[0].discharge_to.should.equal('home')
        res.body[0].self_other.should.equal('self')
        res.body[0].discharge_note.should.equal('patient denies suicidal or homicidal ideation')
        res.body[0].suicidal.should.equal(false)
        res.body[0].homicidal.should.equal(false)
        res.body[0].comprehends_dc_plan.should.equal(true)
        done()
      })
  })

  it('should get discharge by id', (done) => {
    chai
      .request(app)
      .get('/api/discharge/1')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json // jshint ignore:line
        res.body.should.be.a('object')
        res.body.discharge_id.should.equal(1)
        res.body.admission_id.should.equal(1)
        res.body.discharge_rn.should.equal(1)
        res.body.discharge_to.should.equal('home')
        res.body.self_other.should.equal('self')
        res.body.discharge_note.should.equal('patient denies suicidal or homicidal ideation')
        res.body.suicidal.should.equal(false)
        res.body.homicidal.should.equal(false)
        res.body.comprehends_dc_plan.should.equal(true)
        done()
      })
  })

  it('should post a new discharge', done => {
    chai
      .request(app)
      .post('/api/discharge')
      .send({
        "discharge_id":"2",
        "admission_id":"1",
        "discharge_rn":"1",
        "discharge_to":"home",
        "self_other":"self",
        "discharge_note":"abcd",
        "suicidal":"false",
        "suicidal_plan":"denies suicidal ideation",
        "homicidal":"false",
        "homicidal_plan":"denies homicidal ideation",
        "comprehends_dc_plan":"true"
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json // jshint ignore:line
        res.body.should.be.a('object')
        res.body.discharge_id.should.equal(2)
        res.body.admission_id.should.equal(1)
        res.body.discharge_rn.should.equal(1)
        res.body.discharge_to.should.equal('home')
        res.body.self_other.should.equal('self')
        res.body.discharge_note.should.equal('abcd')
        res.body.suicidal.should.equal(false)
        res.body.suicidal_plan.should.equal('denies suicidal ideation')
        res.body.homicidal.should.equal(false)
        res.body.homicidal_plan.should.equal('denies homicidal ideation')
        res.body.comprehends_dc_plan.should.equal(true)
        done()
      })
  })

  it('should update a discharge with new information', done => {
    chai
      .request(app)
      .put('/api/discharge/1')
      .send({
        "suicidal_plan":"1234",
        "homicidal_plan":"abcd"
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json // jshint ignore:line
        res.body.should.be.a('object')
        res.body.discharge_id.should.equal(1)
        res.body.admission_id.should.equal(1)
        res.body.discharge_rn.should.equal(1)
        res.body.discharge_to.should.equal('home')
        res.body.self_other.should.equal('self')
        res.body.discharge_note.should.equal('patient denies suicidal or homicidal ideation')
        res.body.suicidal.should.equal(false)
        res.body.suicidal_plan.should.equal('1234')
        res.body.homicidal.should.equal(false)
        res.body.homicidal_plan.should.equal('abcd')
        res.body.comprehends_dc_plan.should.equal(true)
        done()   
      })
  })

  it('should be able to del discharge by id', done => {
    chai
      .request(app)
      .delete('/api/discharge/1')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json // jshint ignore:line
        res.body.should.equal(1)    
        chai
          .request(app)
          .get('/api/discharge')
          .end((err,res) => {
            res.should.have.status(200)
            res.should.be.json // jshint ignore:line
            res.body.should.be.a('array')
            res.body.length.should.equal(0)
            done()            
          })  
      })
  })      

})













