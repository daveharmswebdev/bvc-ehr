'use strict'

const chai = require('chai')
const should = chai.should
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../server/server')
const config = require('../knexfile').development
const knex = require('knex')(config)

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
        res.body[0].birth_date.should.equal('1972-07-07T05:00:00.000Z')
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
        res.body.birth_date.should.equal('1972-07-07T05:00:00.000Z')
        res.body.street_address.should.equal('2600 Anywhere Street')
        res.body.city.should.equal('Knoxville')
        res.body.state.should.equal('TN')
        res.body.zip.should.equal('37901')
        done()
      })
  })    

})