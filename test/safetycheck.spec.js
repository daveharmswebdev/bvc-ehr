'use strict'

const chai = require('chai')
const should = chai.should
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../server/server')
const config = require('../knexfile').development
const knex = require('knex')(config)

chai.use(chaiHttp)

describe('safety-check routes', () => {

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

	it('should return all checks for given seclusion', (done) => {
		chai
			.request(app)
			.get('/api/safety-check')
			.send({"seclusion_id":"1"})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('array')
				res.body.length.should.equal(1)
				res.body[0].check_id.should.equal(1)
				res.body[0].seclusion_id.should.equal(1)
				res.body[0].user_id.should.equal(1)
				res.body[0].patient_safe.should.equal(true)
				res.body[0].toileting_offered.should.equal(true)
				res.body[0].food_offered.should.equal(true)
				res.body[0].activity.should.equal('resting')
				res.body[0].disposition.should.equal('calm')
				done()
			})
	})

	it('should post a safety-check', done => {
		chai
			.request(app)
			.post('/api/safety-check')
			.send({
				"check_id":"2",
				"seclusion_id":"1",
				"user_id":"2",
				"patient_safe":"true",
				"toileting_offered":"true",
				"food_offered":"false",
				"activity":"sleeping",
				"disposition":"calm"
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.check_id.should.equal(2)
				res.body.seclusion_id.should.equal(1)
				res.body.user_id.should.equal(2)
				res.body.patient_safe.should.equal(true)
				res.body.toileting_offered.should.equal(true)
				res.body.food_offered.should.equal(false)
				res.body.activity.should.equal("sleeping")
				res.body.disposition.should.equal('calm')
				done()
			})
	})

	it('should be able to updated an assessment', done => {
		chai
			.request(app)
			.put('/api/safety-check')
			.send({
				"check_id":"1",
				"activity":"shouting",
				"disposition": "combative"
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.check_id.should.equal(1)
				res.body.seclusion_id.should.equal(1)
				res.body.user_id.should.equal(1)
				res.body.patient_safe.should.equal(true)
				res.body.toileting_offered.should.equal(true)
				res.body.food_offered.should.equal(true)
				res.body.activity.should.equal("shouting")
				res.body.disposition.should.equal('combative')
				done()				
			})	
	})
})


