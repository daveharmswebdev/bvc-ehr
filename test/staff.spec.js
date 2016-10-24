'use strict'

const chai = require('chai')
const should = chai.should
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../server/server')
const config = require('../knexfile').development
const knex = require('knex')(config)

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

  // it('should post a new discharge', done => {
  //   chai
  //     .request(app)
  //     .post('/api/discharge')
  //     .send({
  //       "discharge_id":"2",
  //       "admission_id":"1",
  //       "discharge_rn":"1",
  //       "discharge_to":"home",
  //       "self_other":"self",
  //       "discharge_note":"abcd",
  //       "suicidal":"false",
  //       "suicidal_plan":"denies suicidal ideation",
  //       "homicidal":"false",
  //       "homicidal_plan":"denies homicidal ideation",
  //       "comprehends_dc_plan":"true"
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(200)
  //       res.should.be.json // jshint ignore:line
  //       res.body.should.be.a('object')
  //       res.body.discharge_id.should.equal(2)
  //       res.body.admission_id.should.equal(1)
  //       res.body.discharge_rn.should.equal(1)
  //       res.body.discharge_to.should.equal('home')
  //       res.body.self_other.should.equal('self')
  //       res.body.discharge_note.should.equal('abcd')
  //       res.body.suicidal.should.equal(false)
  //       res.body.suicidal_plan.should.equal('denies suicidal ideation')
  //       res.body.homicidal.should.equal(false)
  //       res.body.homicidal_plan.should.equal('denies homicidal ideation')
  //       res.body.comprehends_dc_plan.should.equal(true)
  //       done()
  //     })
  // })

  // it('should update a discharge with new information', done => {
  //   chai
  //     .request(app)
  //     .put('/api/discharge/1')
  //     .send({
  //       "suicidal_plan":"1234",
  //       "homicidal_plan":"abcd"
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(200)
  //       res.should.be.json // jshint ignore:line
  //       res.body.should.be.a('object')
  //       res.body.discharge_id.should.equal(1)
  //       res.body.admission_id.should.equal(1)
  //       res.body.discharge_rn.should.equal(1)
  //       res.body.discharge_to.should.equal('home')
  //       res.body.self_other.should.equal('self')
  //       res.body.discharge_note.should.equal('patient denies suicidal or homicidal ideation')
  //       res.body.suicidal.should.equal(false)
  //       res.body.suicidal_plan.should.equal('1234')
  //       res.body.homicidal.should.equal(false)
  //       res.body.homicidal_plan.should.equal('abcd')
  //       res.body.comprehends_dc_plan.should.equal(true)
  //       done()   
  //     })
  // })    

})













