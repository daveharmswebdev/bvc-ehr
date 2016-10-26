'use strict'

const chai = require('chai')
const should = chai.should
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../server/server')
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

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

  afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      done();
    });
  });

  it('returns all seclusions', done => {
  	chai
  		.request(app)
  		.get('/api/seclusion')
  		.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('array')
				res.body.length.should.equal(2)
				res.body[0].seclusion_id.should.equal(1)
				res.body[0].intervention_id.should.equal(1)
				res.body[0].user_id.should.equal(1)
				res.body[0].physician1.should.equal('Dr. Jones')
				res.body[0].physician2.should.equal('Dr. Smith')
				done()  			
  		})
  })

	it('should error with improper security for get all', done => {
		chai
			.request(app)
			.get('/api/seclusion')
  		.send({security:0})
			.end((err, res) => {
				res.should.have.status(500)
				done()
			})
	})

  it('return seclusion by id', done => {
  	chai
  		.request(app)
  		.get('/api/seclusion/1')
  		.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('object')
				res.body.seclusion_id.should.equal(1)
				res.body.intervention_id.should.equal(1)
				res.body.user_id.should.equal(1)
				res.body.physician1.should.equal('Dr. Jones')
				res.body.physician2.should.equal('Dr. Smith')
				done()  			
  		})
  })

	it('should error with improper security for get by id', done => {
		chai
			.request(app)
			.get('/api/seclusion/1')
  		.send({security:0})
			.end((err, res) => {
				res.should.have.status(500)
				done()
			})
	})

	it('returns all seclusions by admission_id', (done) => {
		chai
			.request(app)
			.get('/api/seclusionByAdmission/1')
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.be.a('array')
				res.body.length.should.equal(2)
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

	it('should error with improper security for get by id', done => {
		chai
			.request(app)
			.get('/api/seclusionByAdmission/1')
  		.send({security:0})
			.end((err, res) => {
				res.should.have.status(500)
				done()
			})
	})

	it('should post a seclusion', done => {
		chai
			.request(app)
			.post('/api/seclusion')
			.send({
				"seclusion_id": "3",
				"intervention_id": "3",
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
				res.body.seclusion_id.should.equal(3)
				res.body.should.have.property('intervention_id')
				res.body.intervention_id.should.equal(3)
				res.body.should.have.property('user_id')
				res.body.user_id.should.equal(1)
				res.body.should.have.property('start_time')
				res.body.should.have.property('end_time')
				res.body.should.have.property('physician1')
				res.body.physician1.should.equal('Dr. Wiley')
				res.body.should.have.property('physician2')
				res.body.physician2.should.equal('Dr. Marcus')
				done()
			})
	})

	it('should error when posting without intervention', done => {
		chai
			.request(app)
			.post('/api/seclusion')
			.send({
				"intervention_id": "3",
				"user_id": "1",
				"start_time": "2016-10-22 14:00:01",
				"end_time": "2016-10-22 15:01:22",
				"physician1": "Dr. Wiley",
				"physician2": "Dr. Marcus"
			})
			.end((err, res) => {
				res.should.have.status(500)
				done()
			})
	})

	it('should be able to change a broset score', done => {
		chai
			.request(app)
			.put('/api/seclusion/1')
			.send({
				"user_id":"2",
				"physician2": "Dr. Pepper"
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
				res.body.should.have.property('end_time')
				res.body.should.have.property('physician1')
				res.body.physician1.should.equal('Dr. Jones')
				res.body.should.have.property('physician2')
				res.body.physician2.should.equal('Dr. Pepper')
				done()				
			})	
	})

	it('should be able to del by id', done => {
		chai
			.request(app)
			.delete('/api/seclusion/2')
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				res.body.should.equal(1)		
				chai
					.request(app)
					.get('/api/seclusion')
					.end((err,res) => {
						res.should.have.status(200)
						res.should.be.json // jshint ignore:line
						res.body.should.be.a('array')
						res.body.length.should.equal(1)
						done()						
					})	
			})
	})

	it('should error when deleting with key constraint', done => {
		chai
			.request(app)
			.delete('/api/seclusion/1')
			.end((err, res) => {
				res.should.have.status(500)
				done()
			})
	})

	it('should error when updating with wrong data type', done => {
		chai
			.request(app)
			.put('/api/seclusion/1')
			.send({
				"user_id":"abcdedfg",
				"physician2": "Dr. Pepper"
			})				
			.end((err, res) => {
				res.should.have.status(500)
				done()
			})
	})

})


