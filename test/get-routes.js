'use strict'

const app = require('../server/server')
const request = require('supertest')

describe('express', () => {
	it('`GET /` should respond with JSON', (done) => {
		request(app)
			.get('/')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /api/register` should respond with JSON', (done) => {
		request(app)
			.get('/api/register')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /api/login` should respond with JSON', (done) => {
		request(app)
			.get('/api/login')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /api/discharge` should respond with JSON', (done) => {
		request(app)
			.get('/api/discharge')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})	

	it('`GET /api/report` should respond with JSON', (done) => {
		request(app)
			.get('/api/report')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})	
})