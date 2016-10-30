'use strict'

const { Router } = require('express')
const router = Router()
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

router.get('/api/interventionByAdmission/:admissionId', (req, res, next) => {
	knex('intervention')
		.select()
		.orderBy('intervention_id')
		.where('admission_id', req.params.admissionId)
		.then(interventions => {
			res.status(200).json(interventions)
		})
		.catch(error => next(error))
})

router.get('/api/intervention/:id', (req, res, next) => {
	knex('intervention')
		.select()
		.where('intervention_id', req.params.id)
		.then(intervention => {
			res.status(200).json(intervention[0])
		})
		.catch(error => next(error))
})

router.post('/api/intervention', (req, res, next) => {
	knex('intervention')
		.insert(req.body)
		.returning('intervention_id')
		.then( id => {
			knex('intervention')
				.select()
				.where('intervention_id', id[0])
				.then( intervention => res.status(200).json(intervention[0]))
		})
		.catch(error => next(error))
})

router.put('/api/intervention', (req, res, next) => {
	knex('intervention')
		.where('intervention_id', req.body.intervention_id)
		.update(req.body)
		.returning('intervention_id')
		.then( id => {
			knex('intervention')
				.select()
				.where('intervention_id', id[0])
				.then( intervention => res.status(200).json(intervention[0]))
		})
		.catch(error => next(error))
})

module.exports = router