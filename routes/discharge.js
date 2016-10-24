'use strict'

const { Router } = require('express')
const router = Router()
const config = require('../knexfile').development
const knex = require('knex')(config)

// returns all admissions
router.get('/api/discharge', (req, res, next) => {
	knex('discharge')
		.select()
		.then(discharges => {
			res.status(200).json(discharges)
		})
		.catch( error => next(error))
})

// returns admission based on id
router.get('/api/discharge/:id', (req, res, next) => {
	knex('discharge')
		.select()
		.where('discharge_id', req.params.id)
		.then(discharge => {
			res.status(200).json(discharge[0])
		})
		.catch( error => next(error))
})


// router.post('/api/admit', (req, res, next) => {
// 	knex('admission')
// 		.insert(req.body)
// 		.returning('admission_id')
// 		.then( id => {
// 			knex('admission')
// 				.select()
// 				.where('admission_id', id[0])
// 				.then( admission => {
// 					res.status(200).json(admission[0])
// 				})
// 		})
// 		.catch( error => next(error))
// })

// router.put('/api/admit/:id', (req, res, next) => {
// 	knex('admission')
// 		.where('admission_id', req.params.id)
// 		.update(req.body)
// 		.returning('admission_id')
// 		.then(id => {
// 			knex('admission')
// 				.select()
// 				.where('admission_id', id[0])
// 				.then( admission => res.status(200).json(admission[0]))
// 		})
// 		.catch(error => next(error))
// })

module.exports = router