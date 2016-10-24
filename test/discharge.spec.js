'use strict'

const chai = require('chai')
const should = chai.should
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../server/server')
const config = require('../knexfile').development
const knex = require('knex')(config)

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

  // it('should post a new discharge(admit a new discharge', done => {
  //   chai
  //     .request(app)
  //     .post('/api/discharge')
  //     .send({
  //       "patient_id":"2",
  //       "last_name":"Brown",
  //       "first_name":"James",
  //       "middle_initial":"K",
  //       "birth_date":"1963-10-10",
  //       "street_address":"123 street street",
  //       "city":"Nashville",
  //       "state":"TN",
  //       "zip":"37215"
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(200)
  //       res.should.be.json // jshint ignore:line
  //       res.body.should.be.a('object')
  //       res.body.patient_id.should.equal(2)
  //       res.body.last_name.should.equal('Brown')
  //       res.body.first_name.should.equal('James')
  //       res.body.middle_initial.should.equal('K')
  //       res.body.street_address.should.equal('123 street street')
  //       res.body.city.should.equal('Nashville')
  //       res.body.state.should.equal('TN')
  //       res.body.zip.should.equal('37215')
  //       done()
  //     })
  // })

  // it('should update a discharge with new information', done => {
  //   chai
  //     .request(app)
  //     .put('/api/discharge/1')
  //     .send({
  //       "state":"KY",
  //       "zip":"88888"
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(200)
  //       res.should.be.json // jshint ignore:line
  //       res.body.should.be.a('object')
  //       res.body.patient_id.should.equal(1)
  //       res.body.last_name.should.equal('White')
  //       res.body.first_name.should.equal('Barry')
  //       res.body.middle_initial.should.equal('O')
  //       res.body.street_address.should.equal('2600 Anywhere Street')
  //       res.body.city.should.equal('Knoxville')
  //       res.body.state.should.equal('KY')
  //       res.body.zip.should.equal('88888')
  //       done()        
  //     })
  // })    

})













