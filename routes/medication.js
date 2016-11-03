'use strict'

const { Router } = require('express')
const router = Router()
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

router.get('/api/medication', (req, res, next) => {
	knex('medication')
		.join('staff', 'medication.user_id', '=', 'staff.user_id')
		.select()
		.orderBy('medication_id')
		.then(meds => {
			res.status(200).json(meds)
		})
		.catch(error => next(error))
})

router.get('/api/medication/:id', (req, res, next) => {
	knex('medication')
		.join('staff', 'medication.user_id', '=', 'staff.user_id')
		.select()
		.where('medication_id', req.params.id)
		.then(med => {
			res.status(200).json(med[0])
		})
		.catch(error => next(error))
})

router.get('/api/medByIntervention/:interventionId', (req, res, next) => {
	knex('medication')
		.join('staff', 'medication.user_id', '=', 'staff.user_id')
		.select()
		.where('intervention_id', req.params.interventionId)
		.orderBy('medication_id')
		.then(med => {
			res.status(200).json(med)
		})
		.catch(error => next(error))
})

router.post('/api/medication', (req, res, next) => {
	const postId = process.env.NODE_ENV === 'testing' ? 1 : req.user.user_id
	const med = Object.assign({}, req.body, {user_id: postId})
	knex('medication')
		.insert(med)
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

router.put('/api/medication/:id', (req, res, next) => {
	const postId = process.env.NODE_ENV === 'testing' ? 1 : req.user.user_id
	const med = Object.assign({}, req.body, {user_id: postId})
	knex('medication')
		.where('medication_id', req.params.id)
		.update(med)
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