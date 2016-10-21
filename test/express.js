'use strict'

const { property } = require('chai').assert
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
			.get('/asses')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(done)
	})
})