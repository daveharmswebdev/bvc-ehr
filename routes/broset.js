'use strict'

const { Router } = require('express')
const router = Router()
const config = require('../knexfile').development
const knex = require('knex')(config)

router.get('/api/broset', (req, res, next) => {
	knex('broset')
		.select()
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
		.then(() => {
			knex('broset')
				.select()
				.where('broset_id', req.body.broset_id)
				.then( score => res.status(200).json(score[0]))
		})
		.catch(error => next(error))
})

module.exports = router