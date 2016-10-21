'use strict'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const app = require('../server/server')

chai.use(chaiHttp)

describe('api routes', () => {
	describe('broset routes', () => {
		it('should return all scores', (done) => {
			chai
				.request(app)
				.get('/api/broset')
				.end((err, res) => {
					res.should.have.status(200)
					res.should.be.json
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
	})
})


