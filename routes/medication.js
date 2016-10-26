'use strict'

const { Router } = require('express')
const router = Router()
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

router.get('/api/medication', (req, res, next) => {
	knex('medication')
		.select()
		.orderBy('medication_id')
		.then(meds => {
			res.status(200).json(meds)
		})
		.catch(error => next(error))
})

router.get('/api/medication/:id', (req, res, next) => {
	knex('medication')
		.select()
		.where('medication_id', req.params.id)
		.then(med => {
			res.status(200).json(med[0])
		})
		.catch(error => next(error))
})

router.get('/api/medByIntervention/:interventionId', (req, res, next) => {
	knex('medication')
		.select()
		.where('intervention_id', req.params.interventionId)
		.orderBy('medication_id')
		.then(med => {
			res.status(200).json(med)
		})
		.catch(error => next(error))
})

router.post('/api/medication', (req, res, next) => {
	knex('medication')
		.insert(req.body)
		.returning('medication_id')
		.then(id => {
			knex('medication')
				.select()
				.where('medication_id', id[0])
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
		.returning('medication_id')
		.then(id => {
			knex('medication')
				.select()
				.where('medication_id', id[0])
				.then(med => res.status(200).json(med[0]))
		})
		.catch(error => next(error))
})

router.delete('/api/medication/:id', (req, res, next) => {
	knex('medication')
		.del()
		.where('medication_id', req.params.id)
		.then(meds => {
			res.status(200).json(meds)
		})
		.catch(error => next(error))
})
module.exports = router