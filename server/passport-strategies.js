'use strict'

const passport = require('passport')
const { Strategy } = require('passport-local')
const { compare } = require('bcrypt')

// const User = require('../model/user')
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

passport.serializeUser(function(user, done) {
	return done(null, user.user_id)
})
passport.deserializeUser((id, done) =>  {
	knex('staff').where({user_id: id}).select().then( user => {
		[user] = user
		console.log('user', user)
		if (!user) return done(null, false)
		return done(null, user)
	})
})

passport.use(new Strategy({
		usernameField: 'user_name',
		passwordField: 'password'
	},
	function(user_name, password, done) {
		knex('staff').where({user_name: user_name})
			.then(function(user, err) {
				user = user[0]
				if (err) return done(err)
				if(!user) {
					return done(null, false, {message: 'Incorrest username.'})
				}
				compare(password, user.password, function(err, matches) {
					if (err) return done(err)
					if (!matches) {
						return done(null, false, {message: "Incorrect password"})
					} else {
						return done(null, user)
					}
				})
			})
	}
))