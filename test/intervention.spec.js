'use strict'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const app = require('../server/server')
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

chai.use(chaiHttp)

describe('intervention routes', () => {

	beforeEach( done => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      done();
    });
  });

	it('return interventions with admission_id', (done) => {
		chai
			.request(app)
			.get('/api/intervention')
			.send({"admission_id": "1"})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('array')
				res.body.length.should.be.equal(3)
				res.body[0].should.have.property('intervention_id')
				res.body[0].intervention_id.should.equal(1)
				res.body[0].should.have.property('admission_id')
				res.body[0].admission_id.should.equal(1)
				res.body[0].should.have.property('user_id')
				res.body[0].user_id.should.equal(1)
				res.body[0].should.have.property('intervention')
				res.body[0].intervention.should.equal('medication')
				res.body[0].should.have.property('intervention_note')
				res.body[0].intervention_note.should.equal('forced medication')
				done()
			})
	})

	it('should post an intervention', done => {
		chai
			.request(app)
			.post('/api/intervention')
			.send({
				"intervention_id": "4",
				"admission_id": "1",
				"user_id": "1",
				"intervention": "counseling",
				"intervention_note": "denies violent thoughts"
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.should.have.property('intervention_id')
				res.body.intervention_id.should.equal(4)
				res.body.should.have.property('admission_id')
				res.body.admission_id.should.equal(1)
				res.body.should.have.property('user_id')
				res.body.user_id.should.equal(1)
				res.body.should.have.property('intervention')
				res.body.intervention.should.equal('counseling')
				res.body.should.have.property('intervention_note')
				res.body.intervention_note.should.equal('denies violent thoughts')
				done()
			})
	})

	it('should be able to update an intervention post', done => {
		chai
			.request(app)
			.put('/api/intervention')
			.send({
				"intervention_id": "1",
				"admission_id": "1",
				"intervention": "medication",
				"intervention_note": "patient consented"
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.should.have.property('intervention_id')
				res.body.intervention_id.should.equal(1)
				res.body.should.have.property('admission_id')
				res.body.admission_id.should.equal(1)
				res.body.should.have.property('user_id')
				res.body.user_id.should.equal(1)
				res.body.should.have.property('intervention')
				res.body.intervention.should.equal('medication')
				res.body.should.have.property('intervention_note')
				res.body.intervention_note.should.equal('patient consented')
				done()
			})
	})
})


