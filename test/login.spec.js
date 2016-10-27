'use strict'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const app = require('../server/server')
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

chai.use(chaiHttp)

describe('login routes', () => {
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
})