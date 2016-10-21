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

	it('`GET /api/patient` should respond with JSON', (done) => {
		request(app)
			.get('/api/patient')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /api/admit` should respond with JSON', (done) => {
		request(app)
			.get('/api/admit')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /api/assess` should respond with JSON', (done) => {
		request(app)
			.get('/api/assess')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /api/intervention` should respond with JSON', (done) => {
		request(app)
			.get('/api/intervention')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /api/medication` should respond with JSON', (done) => {
		request(app)
			.get('/api/medication')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})	

	it('`GET /api/seclusion` should respond with JSON', (done) => {
		request(app)
			.get('/api/seclusion')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /api/safety-check` should respond with JSON', (done) => {
		request(app)
			.get('/api/safety-check')
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