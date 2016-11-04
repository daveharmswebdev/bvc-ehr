'use strict'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const app = require('../server/server')
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

chai.use(chaiHttp)

describe('login routes', () => {

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

	it('get /api/login should respond with json', done => {
		chai
			.request(app)
			.get('/api/login')
			.end((err,res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				done()
			})	
	})

	it('should respond with json', done => {
		chai
			.request(app)
			.post('/api/login')
			.send({
				user_name: 'maverick',
				password: '123'
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				done()
			})
	})
})