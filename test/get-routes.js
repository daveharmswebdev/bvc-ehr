'use strict'

const app = require('../server/server')
const request = require('supertest')

describe('express', () => {
	it('`GET /api/report` should respond with JSON', (done) => {
		request(app)
			.get('/api/report')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})	
})