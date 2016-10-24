'use strict'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const app = require('../server/server')
const config = require('../knexfile').development
const knex = require('knex')(config)

chai.use(chaiHttp)

describe('medication routes', () => {
	
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

	it('should return all medications', done => {
		chai
			.request(app)
			.get('/api/medication')
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('array')
				res.body.length.should.equal(1)
				res.body[0].medication_id.should.equal(1)
				res.body[0].intervention_id.should.equal(1)
				res.body[0].user_id.should.equal(1)
				res.body[0].medication.should.equal('ativan')
				res.body[0].dose.should.equal(2)
				res.body[0].units.should.equal('mg')
				res.body[0].route.should.equal('sub-cutaneous')
				done()
			})
	})

	it('should return all medications by medication_id', done => {
		chai
			.request(app)
			.get('/api/medication/1')
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.medication_id.should.equal(1)
				res.body.intervention_id.should.equal(1)
				res.body.user_id.should.equal(1)
				res.body.medication.should.equal('ativan')
				res.body.dose.should.equal(2)
				res.body.units.should.equal('mg')
				res.body.route.should.equal('sub-cutaneous')
				done()
			})
	})

	it('should return all medications for one intervention_id', done => {
		chai
			.request(app)
			.get('/api/medByIntervention/1')
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('array')
				res.body.length.should.equal(1)
				res.body[0].should.have.property('medication_id')
				res.body[0].should.have.property('intervention_id')				
				res.body[0].should.have.property('user_id')				
				res.body[0].should.have.property('medication')				
				res.body[0].should.have.property('dose')				
				res.body[0].should.have.property('units')				
				res.body[0].should.have.property('route')
				done()				
			})
	})

	it('should post a new med given', done => {
		chai
			.request(app)
			.post('/api/medication')
			.send({
				"medication_id": "2",
				"intervention_id": "1",
				"user_id": "1",
				"medication": "lortab 5/325",
				"dose": "1",
				"units": "tab",
				"route": "po"
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.should.have.property('medication_id')
				res.body.medication_id.should.equal(2)
				res.body.should.have.property('intervention_id')
				res.body.intervention_id.should.equal(1)
				res.body.should.have.property('user_id')
				res.body.user_id.should.equal(1)
				res.body.should.have.property('medication')
				res.body.medication.should.equal('lortab 5/325')
				res.body.should.have.property('dose')
				res.body.dose.should.equal(1)
				res.body.should.have.property('units')
				res.body.units.should.equal('tab')
				res.body.should.have.property('route')
				res.body.route.should.equal('po')
				done()
			})	
	})

	it('should update a med', done => {
		chai
			.request(app)
			.put('/api/medication')
			.send({
				"medication_id":"1",
				"dose": "1.5"
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.should.have.a.property('medication_id')
				res.body.medication_id.should.equal(1)
				res.body.should.have.a.property('units')
				res.body.units.should.equal('mg')
				res.body.should.have.a.property('dose')
				res.body.dose.should.equal(1.5)
				done()
			})	
	})

  it('should be able to del medication by id', done => {
    chai
      .request(app)
      .delete('/api/medication/1')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json // jshint ignore:line
        res.body.should.equal(1)    
        chai
          .request(app)
          .get('/api/medication')
          .end((err,res) => {
            res.should.have.status(200)
            res.should.be.json // jshint ignore:line
            res.body.should.be.a('array')
            res.body.length.should.equal(0)
            done()            
          })  
      })
  })   

})