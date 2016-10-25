'use strict'

const { Router } = require('express')
const router = Router()
const config = require('../knexfile').development
const knex = require('knex')(config)

router.get('/api/seclusion', (req, res, next) => {
	knex('seclusion')
		.select()
		.orderBy('seclusion_id')
		.then(seclusions => {
			if (req.body.security < 1) {
				return next('unauthorized')
			}
			res.status(200).json(seclusions)
		})
		.catch(next)
})

router.get('/api/seclusion/:id', (req, res, next) => {
	knex('seclusion')
		.select()
		.where('seclusion_id', req.params.id)
		.then(seclusion => {
			if (req.body.security < 1) {
				return next('unauthorized')
			}
			res.status(200).json(seclusion[0])
		})
		.catch(next)
})

router.get('/api/seclusionByAdmission/:admissionId', (req, res, next) => {
	knex('seclusion')
		.join('intervention', 'seclusion.intervention_id', '=', 'intervention.intervention_id' )
		.where('admission_id', req.params.admissionId)
		.then(seclusion => {
			if (req.body.security < 1) {
				return next('unauthorized')
			}
			res.status(200).json(seclusion)
		})
		.catch(next)
})

router.post('/api/seclusion', (req, res, next) => {
	knex('seclusion')
		.insert(req.body)
		.returning('seclusion_id')
		.then(id => {
			knex('seclusion')
				.select()
				.where('seclusion_id', id[0])
				.then( seclusion => {
					res.status(200).json(seclusion[0])
				})
		})
		.catch( error => {
			next(error)
		})
})

router.put('/api/seclusion/:id', (req, res, next) => {
	knex('seclusion')
		.where('seclusion_id', req.params.id)
		.update(req.body)
		.returning('seclusion_id')
		.then(id => {
			knex('seclusion')
				.select()
				.where('seclusion_id', id[0])
				.then( seclusion => res.status(200).json(seclusion[0]))
		})
		.catch(error => {
			res.status(500).json({message:error.error})
			next(error)
		})
})

router.delete('/api/seclusion/:id', (req, res, next) => {
	knex('seclusion')
		.del()
		.where('seclusion_id', req.params.id)
		.then(seclusion => {
			res.status(200).json(seclusion)
		})
		.catch(error => {
			next(error)
		})
})

module.exports = router