'use strict'

const { hash } = require('bcrypt')
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

module.exports.create = (req, res, next) => {
	// test to see if password and confirmation match
	if (req.body.password === req.body.confirmation) {
		// create registration object to inserted into table staff
		const registration = {
			user_name: req.body.user_name,
			last_name: req.body.last_name,
			first_name: req.body.first_name,
			middle_initial: req.body.middle_initial,
			role: req.body.role,
			security_level: req.body.security_level,
			unit: req.body.unit,
			password: req.body.password			
		}
		// see if username is already being used
		knex('staff')
			.select()
			.where('user_name', registration.user_name)
			.then(staff => {
				// if user exists error
				console.log('staff', staff.length)
				if (staff.length > 0) {
					next('User exists')
				} else {
					// if new user create user
					// first bcrypt password then
					// resolve the hash
					return new Promise((resolve, reject) => {
						hash(registration.password, 10, (err,hash) => {
							if (err) {
								reject(err)
							} else {
								resolve(hash)
							}
						})
					})
				}
			})
			.then(hash => {
					registration.password = hash
					knex('staff')
						.insert(registration)
						.returning('user_id')
						.then(id => {
							knex('staff')
								.select()
								.where('user_id', id[0])
								.then(staff => {
									res.status(200).json(staff[0])
								})
						})
						.catch( error => next(error))		
			})
			.catch(error => next(error))
	} else {
		next('Password and confirmation does not match')
	}
}