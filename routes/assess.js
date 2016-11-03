'use strict'

const { Router } = require('express')
const router = Router()
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

router.get('/api/assess', (req, res, next) => {
	knex('assessment')
		.join('staff', 'assessment.nurse_assessing', '=', 'staff.user_id')
		.select()
		.orderBy('assessment_id')
		.then(assessment => res.status(200).json(assessment))
		.catch(error => next(error))
})

router.get('/api/assess/:id', (req, res, next) => {
	knex('assessment')
		.join('staff', 'assessment.nurse_assessing', '=', 'staff.user_id')
		.select()
		.where('assessment_id', req.params.id)
		.orderBy('assessment_id')
		.then(assessment => res.status(200).json(assessment[0]))
		.catch(error => next(error))
})

router.get('/api/assessmentsByAdmissionId/:id', (req, res, next) => {
	knex('assessment')
		.join('staff', 'assessment.nurse_assessing', '=', 'staff.user_id')
		.select()
		.where('admission_id', req.params.id)
		.orderBy('assessment_id')
		.then(assessment => res.status(200).json(assessment))
		.catch(error => next(error))
})

router.post('/api/assess', (req, res, next) => {
	console.log('req.user', req.user)
	const postId = process.env.NODE_ENV === 'testing' ? 1 : req.user.user_id
	const assessment = Object.assign({}, req.body, { nurse_assessing: postId })
	console.log('postId', postId)
	knex('assessment')
		.insert(assessment)
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

router.put('/api/assess/:id', (req, res, next) => {
	console.log('req.user', req.user)
	const postId = process.env.NODE_ENV === 'testing' ? 1 : req.user.user_id
	const edit = Object.assign({}, req.body, { nurse_assessing: postId })
	console.log('postId', postId)
	knex('assessment')
		.where('assessment_id', req.params.id)
		.update(edit)
		.returning('assessment_id')
		.then(id => {
			knex('assessment')
				.select()
				.where('assessment_id', id[0])
				.then(med => res.status(200).json(med[0]))
		})
		.catch(error => next(error))
})

router.delete('/api/assess/:id', (req, res, next) => {
	knex('assessment')
		.del()
		.where('assessment_id', req.params.id)
		.then(assess => {
			res.status(200).json(assess)
		})
		.catch(error => next(error))
})

module.exports = router