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
		.then(() => {
			knex('broset')
				.select()
				.where('broset_id', req.body.broset_id)
				.then( score => {
					res.status(200).json(score[0])
				})
		})
		.catch(function(error) {
			next(error)
		})
})

module.exports = router