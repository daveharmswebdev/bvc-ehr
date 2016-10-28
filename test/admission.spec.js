'use strict'

const chai = require('chai')
const should = chai.should
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../server/server')
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

chai.use(chaiHttp)

describe('admit routes', () => {

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

	it('should return all admissions', (done) => {
		chai
			.request(app)
			.get('/api/admit')
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('array')
				res.body.length.should.equal(1)
				res.body[0].admission_id.should.equal(1)
				res.body[0].patient_id.should.equal(1)
				res.body[0].admission_rn.should.equal(1)
				res.body[0].voluntary_status.should.equal('voluntary')
				res.body[0].complaint.should.equal('suicidal ideation')
				res.body[0].symptoms.should.equal('depression crying insomnia')
				res.body[0].suicidal.should.equal(true)
				res.body[0].suicidal_plan.should.equal('intentional overdose of narcotic pain medication')
				res.body[0].homicidal.should.equal(false)
				expect(res.body[0].homicidal_who).to.be.null // jshint ignore:line
				expect(res.body[0].homicidal_plan).to.be.undefined // jshint ignore:line
				res.body[0].behavioral_health_hx.should.equal('depressed since age 10, one past attempt at age 26.')
				res.body[0].medical_hx.should.equal('type 1 diabetes')
				res.body[0].current_meds.should.equal('prozac insulin')
				res.body[0].smoker.should.equal(false)
				done()
			})
	})

	it('should error with improper security for get all', done => {
		chai
			.request(app)
			.get('/api/admit')
  		.send({security:0})
			.end((err, res) => {
				res.should.have.status(500)
				done()
			})
	})	

	it('should return admission based on id', (done) => {
		chai
			.request(app)
			.get('/api/admit/1')
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('array')
				res.body.length.should.equal(1)
				res.body[0].admission_id.should.equal(1)
				res.body[0].patient_id.should.equal(1)
				res.body[0].admission_rn.should.equal(1)
				res.body[0].voluntary_status.should.equal('voluntary')
				res.body[0].complaint.should.equal('suicidal ideation')
				res.body[0].symptoms.should.equal('depression crying insomnia')
				res.body[0].suicidal.should.equal(true)
				res.body[0].suicidal_plan.should.equal('intentional overdose of narcotic pain medication')
				res.body[0].homicidal.should.equal(false)
				expect(res.body[0].homicidal_who).to.be.null // jshint ignore:line
				expect(res.body[0].homicidal_plan).to.be.undefined // jshint ignore:line
				res.body[0].behavioral_health_hx.should.equal('depressed since age 10, one past attempt at age 26.')
				res.body[0].medical_hx.should.equal('type 1 diabetes')
				res.body[0].current_meds.should.equal('prozac insulin')
				res.body[0].smoker.should.equal(false)
				done()
			})
	})

	it('should error with improper security for get by id', done => {
		chai
			.request(app)
			.get('/api/admit/1')
  		.send({security:0})
			.end((err, res) => {
				res.should.have.status(500)
				done()
			})
	})

	it('should post an admission', done => {
		chai
			.request(app)
			.post('/api/admit')
			.send({
				"admission_id":"2",
				"patient_id":"1",
				"admission_rn":"1",
				"voluntary_status":"voluntary-dpoa",
				"complaint":"combative behavior secondary to alzheimers",
				"symptoms":"a,b,c",
				"suicidal":"false",
				"homicidal":"false",
				"behavioral_health_hx":"alzheimers",
				"medical_hx":"CAD CABG",
				"current_meds":"aspirin",
				"smoker":"false",
				"room":"202"
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.admission_id.should.equal(2)
				res.body.patient_id.should.equal(1)
				res.body.admission_rn.should.equal(1)
				res.body.voluntary_status.should.equal('voluntary-dpoa')
				res.body.complaint.should.equal('combative behavior secondary to alzheimers')
				res.body.symptoms.should.equal('a,b,c')
				res.body.suicidal.should.equal(false)
				expect(res.body.suicidal_plan).to.be.null // jshint ignore:line
				res.body.homicidal.should.equal(false)
				expect(res.body.homicidal_who).to.be.null // jshint ignore:line
				expect(res.body.homicidal_plan).to.be.undefined // jshint ignore:line
				res.body.behavioral_health_hx.should.equal('alzheimers')
				res.body.medical_hx.should.equal('CAD CABG')
				res.body.current_meds.should.equal('aspirin')
				res.body.smoker.should.equal(false)
				done()
			})
	})

	it('should be able to update an assessment', done => {
		chai
			.request(app)
			.put('/api/admit/1')
			.send({
				"current_meds":"prozac",
				"smoker":"true"
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.admission_id.should.equal(1)
				res.body.patient_id.should.equal(1)
				res.body.admission_rn.should.equal(1)
				res.body.voluntary_status.should.equal('voluntary')
				res.body.complaint.should.equal('suicidal ideation')
				res.body.symptoms.should.equal('depression crying insomnia')
				res.body.suicidal.should.equal(true)
				res.body.suicidal_plan.should.equal('intentional overdose of narcotic pain medication')
				res.body.homicidal.should.equal(false)
				expect(res.body.homicidal_who).to.be.null // jshint ignore:line
				expect(res.body.homicidal_plan).to.be.undefined // jshint ignore:line
				res.body.behavioral_health_hx.should.equal('depressed since age 10, one past attempt at age 26.')
				res.body.medical_hx.should.equal('type 1 diabetes')
				res.body.current_meds.should.equal('prozac')
				res.body.smoker.should.equal(true)
				done()		
			})	
	})

	it('should error when posting without patient', done => {
		chai
			.request(app)
			.post('/api/patient')
			.send({
				"admission_id":"2",
				"patient_id":"1000",
				"admission_rn":"1",
				"voluntary_status":"voluntary-dpoa",
				"complaint":"combative behavior secondary to alzheimers",
				"symptoms":"a,b,c",
				"suicidal":"false",
				"homicidal":"false",
				"behavioral_health_hx":"alzheimers",
				"medical_hx":"CAD CABG",
				"current_meds":"aspirin",
				"smoker":"false"
			})
			.end((err, res) => {
				res.should.have.status(500)
				done()
			})
	})

	it('should error when updating with improper data type', done => {
		chai
			.request(app)
			.put('/api/patient/1')
			.send({
				"current_meds":"prozac",
				"smoker":"smokes two packs a day"
			})
			.end((err, res) => {
				res.should.have.status(500)
				done()				
			})
	})

})


