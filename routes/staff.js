'use strict'

const { Router } = require('express')
const router = Router()
const { knexConfig } = require('../config')
const knex = require('knex')(knexConfig)

// returns all staff
router.get('/api/staff', (req, res, next) => {
	knex('staff')
		.select()
		.orderBy('user_id')
		.then(staff => {
			res.status(200).json(staff)
		})
		.catch( error => next(error))
})

// returns staff based on id
router.get('/api/staff/:id', (req, res, next) => {
	knex('staff')
		.select()
		.where('user_id', req.params.id)
		.then(staff => {
			res.status(200).json(staff[0])
		})
		.catch( error => next(error))
})


router.post('/api/staff', (req, res, next) => {
	knex('staff')
		.insert(req.body)
		.returning('user_id')
		.then(id => {
			knex('staff')
				.select()
				.where('user_id', id[0])
				.then(staff => {
					res.status(200).json(staff[0])
				})
		})
		.catch( error => next(error))
})

router.put('/api/staff/:id', (req, res, next) => {
	knex('staff')
		.where('user_id', req.params.id)
		.update(req.body)
		.returning('user_id')
		.then(id => {
			knex('staff')
				.select()
				.where('user_id', id[0])
				.then(staff => res.status(200).json(staff[0]))
		})
		.catch(error => next(error))
})

module.exports = router