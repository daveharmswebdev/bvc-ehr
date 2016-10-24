'use strict'

const { Router } = require('express')
const router = Router()
const config = require('../knexfile').development
const knex = require('knex')(config)

// return all admissions
router.get('/api/patient', (req, res, next) => {
	knex('patient')
		.select()
		.then(patients => {
			res.status(200).json(patients)
		})
		.catch(error => next(error))
})

router.get('/api/patient/:id', (req, res, next) => {
	knex('patient')
		.select()
		.where('patient_id', req.params.id)
		.then(patient => {
			res.status(200).json(patient[0])
		})
		.catch(error => next(error))
})

router.post('/api/patient', (req, res, next) => {
	knex('patient')
		.insert(req.body)
		.returning('patient_id')
		.then( id => {
			knex('patient')
				.select()
				.where('patient_id', id[0])
				.then( patient => {
					res.status(200).json(patient[0])
				})
		})
		.catch( error => next(error))
})

router.put('/api/patient/:id', (req, res, next) => {
	knex('patient')
		.where('patient_id', req.params.id)
		.update(req.body)
		.returning('patient_id')
		.then(id => {
			knex('patient')
				.select()
				.where('patient_id', id[0])
				.then( patient => res.status(200).json(patient[0]))
		})
		.catch(error => next(error))
})


module.exports = router