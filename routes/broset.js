'use strict'

const { Router } = require('express')
const router = Router()
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

router.get('/api/broset', (req, res, next) => {
	knex('broset')
		.select()
		.orderBy('broset_id')
		.then(broset => {
			res.status(200).json(broset)
		})
		.catch( error => next(error))
})

router.get('/api/broset/:id', (req, res, next) => {
	knex('broset')
		.select()
		.where('broset_id', req.params.id)
		.then(broset => {
			res.status(200).json(broset[0])
		})
		.catch( error => next(error))
})

router.get('/api/brosetByAdmission/:admissionId', (req, res, next) => {
	knex('broset')
		.select()
		.where('admission_id', req.params.admissionId)
		.orderBy('broset_id')
		.then(broset => {
			res.status(200).json(broset)
		})
		.catch( error => next(error))
})

router.post('/api/broset', (req, res, next) => {
	knex('broset')
		.insert(req.body)
		.returning('broset_id')
		.then( id => {
			knex('broset')
				.select()
				.where('broset_id', id[0])
				.then( score => {
					res.status(200).json(score[0])
				})
		})
		.catch( error => next(error))
})

router.put('/api/broset', (req, res, next) => {
	knex('broset')
		.where('broset_id', req.body.broset_id)
		.update(req.body)
		.returning('broset_id')
		.then(id => {
			knex('broset')
				.select()
				.where('broset_id', id[0])
				.then( score => res.status(200).json(score[0]))
		})
		.catch(error => next(error))
})

router.delete('/api/broset/:id', (req, res, next) => {
	knex('broset')
		.del()
		.where('broset_id', req.params.id)
		.then(score => {
			res.status(200).json(score)
		})
		.catch(error => next(error))
})

module.exports = router