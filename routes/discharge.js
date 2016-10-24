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


router.post('/api/discharge', (req, res, next) => {
	knex('discharge')
		.insert(req.body)
		.returning('discharge_id')
		.then( id => {
			knex('discharge')
				.select()
				.where('discharge_id', id[0])
				.then( dc => {
					res.status(200).json(dc[0])
				})
		})
		.catch( error => next(error))
})

router.put('/api/discharge/:id', (req, res, next) => {
	knex('discharge')
		.where('discharge_id', req.params.id)
		.update(req.body)
		.returning('discharge_id')
		.then(id => {
			knex('discharge')
				.select()
				.where('discharge_id', id[0])
				.then( dc => res.status(200).json(dc[0]))
		})
		.catch(error => next(error))
})

router.delete('/api/discharge/:id', (req, res, next) => {
	knex('discharge')
		.del()
		.where('discharge_id', req.params.id)
		.then(discharge => {
			res.status(200).json(discharge)
		})
		.catch(error => next(error))
})

module.exports = router