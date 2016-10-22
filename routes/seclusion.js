'use strict'

const { Router } = require('express')
const router = Router()
const config = require('../knexfile').development
const knex = require('knex')(config)

router.get('/api/seclusion', (req, res, next) => {
	knex('seclusion')
		.join('intervention', 'seclusion.intervention_id', '=', 'intervention.intervention_id' )
		.where('admission_id', req.body.admission_id)
		.then(seclusion => {
			res.status(200).json(seclusion)
		})
		.catch( error => next(error))
})

router.post('/api/seclusion', (req, res, next) => {
	knex('seclusion')
		.insert(req.body)
		.then(() => {
			knex('seclusion')
				.select()
				.where('seclusion_id', req.body.seclusion_id)
				.then( seclusion => {
					res.status(200).json(seclusion[0])
				})
		})
		.catch( error => next(error))
})

router.put('/api/seclusion', (req, res, next) => {
	knex('seclusion')
		.where('seclusion_id', req.body.seclusion_id)
		.update(req.body)
		.then(() => {
			knex('seclusion')
				.select()
				.where('seclusion_id', req.body.seclusion_id)
				.then( seclusion => res.status(200).json(seclusion[0]))
		})
		.catch(error => next(error))
})

module.exports = router