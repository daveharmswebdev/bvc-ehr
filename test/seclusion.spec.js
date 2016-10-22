'use strict'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const app = require('../server/server')
const config = require('../knexfile').development
const knex = require('knex')(config)

chai.use(chaiHttp)

describe('seclusion routes', () => {

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

	it('should return all seclusions for this admission', (done) => {
		chai
			.request(app)
			.get('/api/seclusion')
			.send({"admission_id":"1"})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('array')
				res.body.length.should.equal(1)
				res.body[0].should.have.property('seclusion_id')
				res.body[0].should.have.property('intervention_id')
				res.body[0].should.have.property('user_id')
				res.body[0].should.have.property('start_time')
				res.body[0].should.have.property('end_time')
				res.body[0].should.have.property('physician1')
				res.body[0].should.have.property('physician2')
				done()
			})
	})

	it('should post a seclusion', done => {
		chai
			.request(app)
			.post('/api/seclusion')
			.send({
				"seclusion_id": "2",
				"intervention_id": "1",
				"user_id": "1",
				"start_time": "2016-10-22 14:00:01",
				"end_time": "2016-10-22 15:01:22",
				"physician1": "Dr. Wiley",
				"physician2": "Dr. Marcus"
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.should.have.property('seclusion_id')
				res.body.seclusion_id.should.equal(2)
				res.body.should.have.property('intervention_id')
				res.body.intervention_id.should.equal(2)
				res.body.should.have.property('user_id')
				res.body.user_id.should.equal(1)
				res.body.should.have.property('start_time')
				res.body.start_time.should.equal('2016-10-22 14:00:01')
				res.body.should.have.property('end_time')
				res.body.end_time.should.equal('2016-10-22 15:01:22')
				res.body.should.have.property('physician1')
				res.body.physician1.should.equal('Dr. Wiley')
				res.body.should.have.property('physician2')
				res.body.physician2.should.equal('Dr. Marcus')
				done()
			})
	})

	it('should be able to change a broset score', done => {
		chai
			.request(app)
			.put('/api/seclusion')
			.send({
				"seclusion_id":"1",
				"user_id":"2",
				"physican2": "Dr. Pepper"
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.should.have.property('seclusion_id')
				res.body.seclusion_id.should.equal(1)
				res.body.should.have.property('intervention_id')
				res.body.intervention_id.should.equal(1)
				res.body.should.have.property('user_id')
				res.body.user_id.should.equal(2)
				res.body.should.have.property('start_time')
				res.body.start_time.should.equal('2016-10-20 20:01:16-05')
				res.body.should.have.property('end_time')
				res.body.end_time.should.equal('2016-10-20 20:16:57-05')
				res.body.should.have.property('physician1')
				res.body.physician1.should.equal('Dr. Jones')
				res.body.should.have.property('physician2')
				res.body.physician2.should.equal('Dr. Pepper')
				done()				
			})	
	})
	})


