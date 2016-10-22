'use strict'

const { Router } = require('express')
const router = Router()
const config = require('../knexfile').development
const knex = require('knex')(config)

router.get('/api/medication', (req, res, next) => {
	knex('medication')
		.select()
		.where('intervention_id', req.body.intervention_id)
		.then(med => {
			res.status(200).json(med)
		})
		.catch(error => next(error))
})

router.post('/api/medication', (req, res, next) => {
	knex('medication')
		.insert(req.body)
		.then(() => {
			knex('medication')
				.select()
				.where('medication_id', req.body.medication_id)
				.then(med => {
					res.status(200).json(med[0])
				})
				.catch(error => next(error))
		})
})

router.put('/api/medication', (req, res, next) => {
	knex('medication')
		.where('medication_id', req.body.medication_id)
		.update(req.body)
		.then(() => {
			knex('medication')
				.select()
				.where('medication_id', req.body.medication_id)
				.then(med => res.status(200).json(med[0]))
		})
		.catch(error => next(error))
})

module.exports = router