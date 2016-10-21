'use strict'

const request = require('supertest')

describe('express', () => {
	let app
	beforeEach(function() {
		app = require('../server/server')
	})
	afterEach(function() {
		app.close()
	})
	it('`GET /` should respond with JSON', (done) => {
		request(app)
			.get('/')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /register` should respond with JSON', (done) => {
		request(app)
			.get('/register')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /login` should respond with JSON', (done) => {
		request(app)
			.get('/login')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /patient` should respond with JSON', (done) => {
		request(app)
			.get('/patient')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /admit` should respond with JSON', (done) => {
		request(app)
			.get('/admit')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /assess` should respond with JSON', (done) => {
		request(app)
			.get('/assess')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /broset` should respond with JSON', (done) => {
		request(app)
			.get('/broset')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /intervention` should respond with JSON', (done) => {
		request(app)
			.get('/intervention')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /medication` should respond with JSON', (done) => {
		request(app)
			.get('/medication')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})	

	it('`GET /seclusion` should respond with JSON', (done) => {
		request(app)
			.get('/seclusion')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /safety-check` should respond with JSON', (done) => {
		request(app)
			.get('/safety-check')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})

	it('`GET /discharge` should respond with JSON', (done) => {
		request(app)
			.get('/discharge')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})	

	it('`GET /report` should respond with JSON', (done) => {
		request(app)
			.get('/report')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})	
})