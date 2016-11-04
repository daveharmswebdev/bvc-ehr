'use strict'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const app = require('../server/server')

chai.use(chaiHttp)

describe('logout routes', () => {
	
	it('should return with status 200 and json', done => {
		chai
			.request(app)
			.get('/api/logout')
			.end((err, res) => {
				res.should.have.status(200)
				res.should.be.json // jshint ignore:line
				done()				
			})
	})
})