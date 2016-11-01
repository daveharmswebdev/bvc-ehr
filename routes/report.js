'use strict'

const { Router } = require('express')
const router = Router()
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

router.get('/api/report/:admissionId', (req, res, next) => {
	knex('admission')
		.join('patient', 'admission.patient_id', '=', 'patient.patient_id')
		.join('broset', 'admission.admission_id', '=', 'broset.admission_id')
		.select()
		.where('admission.admission_id', req.params.admissionId)
		.then(admission => {
			console.log('admission', admission)
			res.status(200).json(admission)
		})
		.catch(error => next(error))
})

module.exports = router