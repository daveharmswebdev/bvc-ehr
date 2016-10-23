'use strict'

const { Router } = require('express')
const router = Router()
const config = require('../knexfile').development
const knex = require('knex')(config)

// returns all admissions
router.get('/api/admit', (req, res, next) => {
	knex('admission')
		.select()
		.then(admissions => {
			res.status(200).json(admissions)
		})
		.catch( error => next(error))
})

// router.post('/api/admit', (req, res, next) => {
// 	knex('admission')
// 		.insert(req.body)
// 		.returning('broset_id')
// 		.then( id => {
// 			knex('admission')
// 				.select()
// 				.where('broset_id', id[0])
// 				.then( score => {
// 					res.status(200).json(score[0])
// 				})
// 		})
// 		.catch( error => next(error))
// })

// router.put('/api/admit', (req, res, next) => {
// 	knex('admission')
// 		.where('broset_id', req.body.broset_id)
// 		.update(req.body)
// 		.returning('broset_id')
// 		.then(id => {
// 			knex('admission')
// 				.select()
// 				.where('broset_id', id[0])
// 				.then( score => res.status(200).json(score[0]))
// 		})
// 		.catch(error => next(error))
// })

module.exports = router