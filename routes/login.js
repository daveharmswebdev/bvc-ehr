'use strict'

const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/login')

router.get('/api/login', (req,res) => {
	res.send({})
})

router.post('/api/login', ctrl.create)

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