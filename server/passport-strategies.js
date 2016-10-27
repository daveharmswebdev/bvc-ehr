'use strict'

const passport = require('passport')
const { Strategy } = require('passport-local')
const { compare } = require('bcrypt')

// const User = require('../model/user')
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

passport.serializeUser(function(user, done) {
	console.log('user_name in serializer', user.user_id)
	return done(null, user.user_id)
})
passport.deserializeUser((id, done) =>  {
	console.log('deserializing********************', id)
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
		console.log('user_name', user_name)
		console.log('password', password)
		knex('staff').where({user_name: user_name})
			.then(function(user, err) {
				user = user[0]
				console.log('user in passport strategies', user)
				if (err) return done(err)
				if(!user) {
					console.log('no user')
					return done(null, false, {message: 'Incorrest username.'})
				}
				compare(password, user.password, function(err, matches) {
					console.log('we are comparing')
					if (err) return done(err)
					if (!matches) {
						console.log('no matches')
						return done(null, false, {message: "Incorrect password"})
					} else {
						console.log('there is a match', user)
						return done(null, user)
					}
				})
			})
	}
))