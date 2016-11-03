'use strict'

const passport = require('passport')

function trimUser(user) {
	const trimmedUser = {
		user_name: user.user_name,
	}
	return trimmedUser
}

module.exports.create = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) { return next(err) }
		if (!user) { return next('did not authenticate')}
		console.log('no error and we have a user', user)
		req.logIn(user, err => {
			console.log('req.user from create', req.user)
			if (err) { return next(err) }
			return res.status(200).json(trimUser(user))
		})
		
	})(req, res, next)
}