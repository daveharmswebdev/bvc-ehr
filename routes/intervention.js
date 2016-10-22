'use strict'

const { Router } = require('express')
const router = Router()
const config = require('../knexfile').development
const knex = require('knex')(config)

router.get('/api/intervention', (req, res, next) => {
	knex('intervention')
		.select()
		.then(interventions => {
			res.status(200).json(interventions)
		})
		.catch(error => next(error))
})

router.post('/api/intervention', (req, res, next) => {
	knex('intervention')
		.insert(req.body)
		.then(() => {
			knex('intervention')
				.select()
				.where('intervention_id', req.body.intervention_id)
				.then( intervention => res.status(200).json(intervention[0]))
		})
		.catch(function(error) {
			next(error)
		})
})

module.exports = router