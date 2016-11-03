'use strict'

const { Router } = require('express')
const router = Router()
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

router.get('/api/intervention', (req, res, next) => {
	knex('intervention')
		.join('staff', 'intervention.user_id', '=', 'staff.user_id')
		.select()
		.orderBy('intervention_id')
		.then(interventions => {
			res.status(200).json(interventions)
		})
		.catch(error => next(error))		
})

router.get('/api/interventionByAdmission/:admissionId', (req, res, next) => {
	knex('intervention')
		.join('staff', 'intervention.user_id', '=', 'staff.user_id')
		.leftJoin('medication', 'intervention.intervention_id', '=', 'medication.intervention_id')
		.select(
			'intervention.intervention_id as intervention_id',
			'admission_id',
			'intervention.user_id as user_id',
			'intervention',
			'intervention_note',
			'intervention_time',
			'medication_id',
			'medication',
			'dose',
			'units',
			'route',
			'medication_time',
			'staff.*'
		)
		.orderBy('intervention.intervention_id')
		.where('admission_id', req.params.admissionId)
		.then(interventions => {
			console.log('interventions', interventions[1])
			res.status(200).json(interventions)
		})
		.catch(error => next(error))
})

router.get('/api/intervention/:id', (req, res, next) => {
	knex('intervention')
		.join('staff', 'intervention.user_id', '=', 'staff.user_id')
		.select()
		.where('intervention_id', req.params.id)
		.then(intervention => {
			res.status(200).json(intervention[0])
		})
		.catch(error => next(error))
})

router.post('/api/intervention', (req, res, next) => {
	const postId = process.env.NODE_ENV === 'testing' ? 1 : req.user.user_id
	const intervention = Object.assign({}, req.body, { user_id: postId })
	knex('intervention')
		.insert(intervention)
		.returning('intervention_id')
		.then( id => {
			knex('intervention')
				.select()
				.where('intervention_id', id[0])
				.then( intervention => res.status(200).json(intervention[0]))
		})
		.catch(error => next(error))
})

router.delete('/api/intervention/:id', (req, res, next) => {
	knex('intervention')
		.del()
		.where('intervention_id', req.params.id)
		.then(response => {
			res.status(200).json(response)
		})
		.catch(error => next(error))
})

router.put('/api/intervention/:id', (req, res, next) => {
	const postId = process.env.NODE_ENV === 'testing' ? 1 : req.user.user_id
	const intervention = Object.assign({}, req.body, { user_id: postId })
	knex('intervention')
		.where('intervention_id', req.params.id)
		.update(intervention)
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