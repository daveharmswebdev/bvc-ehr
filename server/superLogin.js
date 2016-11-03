'use strict'

const superagent = require('superagent')
const agent = superagent.agent()
const account = {
	user_name: 'maverick',
	password: '123'
}

exports.login = (request, done) => {
	request
		.post('/api/login')
		.send(account)
		.end((err,res) => {
			if (err) {
				throw err
			}
			agent.saveCookies(res)
			done(agent)
		})
}