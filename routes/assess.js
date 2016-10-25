'use strict'

const { Router } = require('express')
const router = Router()
const config = require('../knexfile').development
const knex = require('knex')(config)

router.get('/api/assess', (req, res, next) => {
	knex('assessment')
		.select()
		.orderBy('assessment_id')
		.then(assessment => res.status(200).json(assessment))
		.catch(error => next(error))
})

router.get('/api/assessmentsByAdmissionId/:id', (req, res, next) => {
	knex('assessment')
		.select()
		.where('admission_id', req.params.id)
		.orderBy('assessment_id')
		.then(assessment => res.status(200).json(assessment))
		.catch(error => next(error))
})

router.post('/api/assess', (req, res, next) => {
	knex('assessment')
		.insert(req.body)
		.returning('assessment_id')
		.then( id => {
			knex('assessment')
				.select()
				.where('assessment_id', id[0])
				.then(med => {
					res.status(200).json(med[0])
				})
				.catch(error => next(error))
		})
})

router.put('/api/assess', (req, res, next) => {
	knex('assessment')
		.where('assessment_id', req.body.assessment_id)
		.update(req.body)
		.returning('assessment_id')
		.then(id => {
			knex('assessment')
				.select()
				.where('assessment_id', id[0])
				.then(med => res.status(200).json(med[0]))
		})
		.catch(error => next(error))
})

module.exports = router