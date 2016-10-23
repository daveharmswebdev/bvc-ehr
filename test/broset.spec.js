'use strict'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const app = require('../server/server')
const config = require('../knexfile').development
const knex = require('knex')(config)

chai.use(chaiHttp)

describe('broset routes', () => {

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

	it('should return all scores based on admission', (done) => {
		chai
			.request(app)
			.get('/api/broset')
			.send({"admission_id":"1"})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('array')
				res.body.length.should.equal(3)
				res.body[0].should.have.property('broset_id')
				res.body[0].should.have.property('admission_id')
				res.body[0].should.have.property('user_id')
				res.body[0].should.have.property('confused')
				res.body[0].should.have.property('irritable')
				res.body[0].should.have.property('boisterous')
				res.body[0].should.have.property('verbal_threats')
				res.body[0].should.have.property('physical_threats')
				res.body[0].should.have.property('attacking_furniture')
				done()
			})
	})

	it('should post a broset score', done => {
		chai
			.request(app)
			.post('/api/broset')
			.send({
				"broset_id": "4",
				"admission_id": "1",
				"user_id": "1",
				"confused": "true",
				"irritable": "true",
				"boisterous": "true",
				"verbal_threats": "true",
				"physical_threats": "true",
				"attacking_furniture": "true"
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.should.have.property('broset_id')
				res.body.broset_id.should.equal(4)
				res.body.should.have.property('user_id')
				res.body.user_id.should.equal(1)
				res.body.should.have.property('confused')
				res.body.confused.should.equal(true)
				res.body.should.have.property('boisterous')
				res.body.boisterous.should.equal(true)
				done()
			})
	})

	it('should be able to change a broset score', done => {
		chai
			.request(app)
			.put('/api/broset')
			.send({
				"broset_id":"3",
				"physical_threats":"false"
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.should.have.property('broset_id')
				res.body.broset_id.should.equal(3)
				res.body.should.have.property('user_id')
				res.body.user_id.should.equal(1)
				res.body.should.have.property('confused')
				res.body.confused.should.equal(true)
				res.body.should.have.property('boisterous')
				res.body.boisterous.should.equal(true)
				res.body.should.have.property('physical_threats')
				res.body.physical_threats.should.equal(false)
				done()					
			})	
	})
	})


