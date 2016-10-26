'use strict'

const chai = require('chai')
const should = chai.should
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../server/server')
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

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

	it('should return all safety-checks', (done) => {
		chai
			.request(app)
			.get('/api/safety-check')
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

	it('should error with improper security for get all', done => {
		chai
			.request(app)
			.get('/api/safety-check')
  		.send({security:0})
			.end((err, res) => {
				res.should.have.status(500)
				done()
			})
	})

	it('should return safety-check by id', (done) => {
		chai
			.request(app)
			.get('/api/safety-check/1')
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
				res.body.activity.should.equal('resting')
				res.body.disposition.should.equal('calm')
				done()
			})
	})

	it('should error with improper security for get by id', done => {
		chai
			.request(app)
			.get('/api/safety-check/1')
  		.send({security:0})
			.end((err, res) => {
				res.should.have.status(500)
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

	it('should error when posting with out a seclusion', done => {
		chai
			.request(app)
			.post('/api/safety-check')
			.send({
				"check_id":"2",
				"seclusion_id":"100",
				"user_id":"2",
				"patient_safe":"true",
				"toileting_offered":"true",
				"food_offered":"false",
				"activity":"sleeping",
				"disposition":"calm"
			})
			.end((err, res) => {
				res.should.have.status(500)
				done()
			})
	})

	it('should be able to update an assessment', done => {
		chai
			.request(app)
			.put('/api/safety-check/1')
			.send({
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

	it('should be able to del by id', done => {
		chai
			.request(app)
			.delete('/api/safety-check/1')
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.equal(1)		
				chai
					.request(app)
					.get('/api/safety-check')
					.end((err,res) => {
						res.should.have.status(200)
						res.should.be.json // jshint ignore:line
						res.body.should.be.a('array')
						res.body.length.should.equal(0)
						done()						
					})	
			})
	})

	it('should error when updating with wrong data type', done => {
		chai
			.request(app)
			.put('/api/safety-check/1')
			.send({
				"user_id":"abcdedfg",
				"toileting_offered": "Dr. Pepper"
			})				
			.end((err, res) => {
				res.should.have.status(500)
				done()
			})
	})

	it('should error when trying to delete with bad id', done => {
		chai
			.request(app)
			.delete('/api/safety-check/20')
			.end((err, res) => {
				res.should.have.status(500)
				done()
			})
	})

})


