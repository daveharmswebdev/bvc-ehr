'use strict'

const { Router } = require('express')
const router = Router()
const config = require('../knexfile').development
const knex = require('knex')(config)

router.get('/api/safety-check', (req, res, next) => {
	knex('seclusion_safety_check')
		.select()
		.orderBy('check_id')
		.then(seclusion => res.status(200).json(seclusion))
		.catch(error => next(error))
})

router.get('/api/safety-check/:id', (req, res, next) => {
	knex('seclusion_safety_check')
		.select()
		.where('check_id', req.params.id)
		.then(seclusion => res.status(200).json(seclusion[0]))
		.catch(error => next(error))
})

router.post('/api/safety-check', (req, res, next) => {
	knex('seclusion_safety_check')
		.insert(req.body)
		.returning('check_id')
		.then( id => {
			knex('seclusion_safety_check')
				.select()
				.where('check_id', id[0])
				.then(check => {
					res.status(200).json(check[0])
				})
				.catch(error => next(error))
		})
})

router.put('/api/safety-check', (req, res, next) => {
	knex('seclusion_safety_check')
		.where('check_id', req.body.check_id)
		.update(req.body)
		.returning('check_id')
		.then(id => {
			knex('seclusion_safety_check')
				.select()
				.where('check_id', id[0])
				.then(check => res.status(200).json(check[0]))
		})
		.catch(error => next(error))
})

router.delete('/api/safety-check/:id', (req, res, next) => {
	knex('seclusion_safety_check')
		.del()
		.where('check_id', req.params.id)
		.then(check => {
			res.status(200).json(check)
		})
		.catch(error => next(error))
})

module.exports = router