'use strict'

const { Router } = require('express')
const router = Router()
const passport = require('passport')

router.get('/api/login', (req,res) => {
	res.send({})
})

router.post('/api/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) { return next(err) }
		if (!user) { return next('did not authenticate')}
		console.log('no error and we have a user', user)
		return res.status(200).json(user)
	})(req, res, next)
})

// router
// 	.post('/api/login', 
// 		passport
// 			.authenticate('local', (err, user, msg) => {
// 				if (err) { return next(err) }
// 				if (!user) { return next(err) }
// 				return res.status(200).json(user)
// 			})
// 	)()

module.exports = router