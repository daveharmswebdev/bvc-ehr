'use strict'

const chai = require('chai')
const should = chai.should
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../server/server')
const config = require('../knexfile').development
const knex = require('knex')(config)

chai.use(chaiHttp)

describe('assess routes', () => {

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

	it('should return all assessments', (done) => {
		chai
			.request(app)
			.get('/api/assess')
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('array')
				res.body.length.should.equal(3)
				res.body[0].should.have.property('assessment_id')
				res.body[0].assessment_id.should.equal(1)
				res.body[0].admission_id.should.equal(1)
				res.body[0].oriented_person.should.equal(true)
				res.body[0].oriented_place.should.equal(true)
				res.body[0].oriented_time.should.equal(true)
				res.body[0].oriented_purpose.should.equal(true)
				res.body[0].suicidal.should.equal(true)
				res.body[0].suicidal_plan.should.equal('overdose on medication, narcotics at home')
				res.body[0].homicidal.should.equal(false)
				expect(res.body[0].homicidal_plan).to.be.null // jshint ignore:line
				expect(res.body[0].visual_hallucinations).to.be.null // jshint ignore:line
				expect(res.body[0].audio_hallucinations).to.be.null // jshint ignore:line
				expect(res.body[0].tactile_hallucinations).to.be.null // jshint ignore:line
				res.body[0].hallucination_comments.should.equal('denies all hallucinations')
				res.body[0].affect.should.equal('flat')
				res.body[0].appetite.should.equal('anorexic, drank coffee for breakfast, no meal')
				res.body[0].appearance.should.equal('groomed')
				res.body[0].speech.should.equal('normal, but low in volume')
				res.body[0].nurse_assessing.should.equal(1)
				done()
			})
	})

	it('returns assessment by assessment_id', (done) => {
		chai
			.request(app)
			.get('/api/assess/3')
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.should.have.property('assessment_id')
				res.body.assessment_id.should.equal(3)
				res.body.admission_id.should.equal(1)
				res.body.oriented_person.should.equal(true)
				res.body.oriented_place.should.equal(true)
				res.body.oriented_time.should.equal(true)
				res.body.oriented_purpose.should.equal(true)
				res.body.suicidal.should.equal(true)
				res.body.suicidal_plan.should.equal('overdose on medication, narcotics at home')
				res.body.homicidal.should.equal(false)
				expect(res.body.homicidal_plan).to.be.null // jshint ignore:line
				expect(res.body.visual_hallucinations).to.be.null // jshint ignore:line
				expect(res.body.audio_hallucinations).to.be.null // jshint ignore:line
				expect(res.body.tactile_hallucinations).to.be.null // jshint ignore:line
				res.body.hallucination_comments.should.equal('denies all hallucinations')
				res.body.affect.should.equal('flat')
				res.body.appetite.should.equal('normal')
				res.body.appearance.should.equal('groomed')
				res.body.speech.should.equal('normal, but low in volume')
				res.body.nurse_assessing.should.equal(1)
				done()
			})
	})

	it('should return all assessments by admission id', (done) => {
		chai
			.request(app)
			.get('/api/assessmentsByAdmissionId/1')
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('array')
				res.body.length.should.equal(3)
				res.body[0].should.have.property('assessment_id')
				res.body[0].assessment_id.should.equal(1)
				res.body[0].admission_id.should.equal(1)
				res.body[0].oriented_person.should.equal(true)
				res.body[0].oriented_place.should.equal(true)
				res.body[0].oriented_time.should.equal(true)
				res.body[0].oriented_purpose.should.equal(true)
				res.body[0].suicidal.should.equal(true)
				res.body[0].suicidal_plan.should.equal('overdose on medication, narcotics at home')
				res.body[0].homicidal.should.equal(false)
				expect(res.body[0].homicidal_plan).to.be.null // jshint ignore:line
				expect(res.body[0].visual_hallucinations).to.be.null // jshint ignore:line
				expect(res.body[0].audio_hallucinations).to.be.null // jshint ignore:line
				expect(res.body[0].tactile_hallucinations).to.be.null // jshint ignore:line
				res.body[0].hallucination_comments.should.equal('denies all hallucinations')
				res.body[0].affect.should.equal('flat')
				res.body[0].appetite.should.equal('anorexic, drank coffee for breakfast, no meal')
				res.body[0].appearance.should.equal('groomed')
				res.body[0].speech.should.equal('normal, but low in volume')
				res.body[0].nurse_assessing.should.equal(1)
				done()
			})
	})

	it('should post a assessment', done => {
		chai
			.request(app)
			.post('/api/assess')
			.send({
				"assessment_id":"4",
				"admission_id":"1",
				"oriented_person":"false",
				"oriented_place":"false",
				"oriented_time":"false",
				"oriented_purpose":"false",
				"suicidal":"true",
				"suicidal_plan":"gun",
				"homicidal":"true",
				"homicidal_plan":"kill neighbor",
				"visual_hallucinations":"sees dead brother",
				"audio_hallucinations":"hears dead brother",
				"tactile_hallucinations":"spider sensation",
				"hallucination_comments":"none",
				"affect":"flat",
				"appetite":"anorexic",
				"appearance":"gaunt",
				"speech":"slow",
				"nurse_assessing":"1",
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.assessment_id.should.equal(4)
				res.body.admission_id.should.equal(1)
				res.body.oriented_person.should.equal(false)
				res.body.oriented_place.should.equal(false)
				res.body.oriented_time.should.equal(false)
				res.body.oriented_purpose.should.equal(false)
				res.body.suicidal.should.equal(true)
				res.body.suicidal_plan.should.equal('gun')
				res.body.homicidal.should.equal(true)
				res.body.homicidal_plan.should.equal('kill neighbor')
				res.body.visual_hallucinations.should.equal('sees dead brother')
				res.body.audio_hallucinations.should.equal('hears dead brother')
				res.body.tactile_hallucinations.should.equal('spider sensation')
				res.body.hallucination_comments.should.equal('none')
				res.body.affect.should.equal('flat')
				res.body.appetite.should.equal('anorexic')
				res.body.appearance.should.equal('gaunt')
				res.body.speech.should.equal('slow')
				res.body.nurse_assessing.should.equal(1)
				done()
			})
	})

	it('should be able to updated an assessment', done => {
		chai
			.request(app)
			.put('/api/assess')
			.send({
				"assessment_id":"1",
				"homicidal":"false",
				"homicidal_plan": "now denies homicidal ideations"
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.assessment_id.should.equal(1)
				res.body.admission_id.should.equal(1)
				res.body.oriented_person.should.equal(true)
				res.body.oriented_place.should.equal(true)
				res.body.oriented_time.should.equal(true)
				res.body.oriented_purpose.should.equal(true)
				res.body.suicidal.should.equal(true)
				res.body.suicidal_plan.should.equal('overdose on medication, narcotics at home')
				res.body.homicidal.should.equal(false)
				res.body.homicidal_plan.should.equal('now denies homicidal ideations')
				expect(res.body.visual_hallucinations).to.be.null // jshint ignore:line
				expect(res.body.audio_hallucinations).to.be.null // jshint ignore:line
				expect(res.body.tactile_hallucinations).to.be.null // jshint ignore:line
				res.body.hallucination_comments.should.equal('denies all hallucinations')
				res.body.affect.should.equal('flat')
				res.body.appetite.should.equal('anorexic, drank coffee for breakfast, no meal')
				res.body.appearance.should.equal('groomed')
				res.body.speech.should.equal('normal, but low in volume')
				res.body.nurse_assessing.should.equal(1)
				done()				
			})	
	})
})


