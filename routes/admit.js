'use strict'

const { Router } = require('express')
const router = Router()
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

// returns all admissions
router.get('/api/admit', (req, res, next) => {
	knex('admission')
		.join('patient', 'admission.patient_id', '=', 'patient.patient_id')
		.select()
		.orderBy('admission_id')
		.then(admissions => {
			if (req.body.security < 1) {
				return next('unauthorized')
			}
			res.status(200).json(admissions)
		})
		.catch(next)
})

// returns admission based on id
router.get('/api/admit/:id', (req, res, next) => {
	knex('admission')
		.join('patient', 'admission.patient_id', '=', 'patient.patient_id')
		.select()
		.where('admission_id', req.params.id)
		.then(admission => {
			if (req.body.security < 1) {
				return next('unauthorized')
			}
			res.status(200).json(admission[0])
		})
		.catch(next)
})


router.post('/api/admit', (req, res, next) => {
	const newAdmit = Object.assign({}, req.body, {admission_rn: req.user.user_id})
	knex('admission')
		.insert(newAdmit)
		.returning('admission_id')
		.then( id => {
			knex('admission')
				.select()
				.where('admission_id', id[0])
				.then( admission => {
					res.status(200).json(admission[0])
				})
		})
		.catch( error => next(error))
})

router.delete('/api/admit/:id', (req, res, next) => {
	knex('admission')
		.del()
		.where('admission_id', req.params.id)
		.then(admission => {
			res.status(200).json(admission)
		})
		.catch(error => next(error))
})

router.put('/api/admit/:id', (req, res, next) => {
	knex('admission')
		.where('admission_id', req.params.id)
		.update(req.body)
		.returning('admission_id')
		.then(id => {
			knex('admission')
				.select()
				.where('admission_id', id[0])
				.then( admission => res.status(200).json(admission[0]))
		})
		.catch(error => next(error))
})

module.exports = router