'use strict'

const { Router } = require('express')
const router = Router()
const config = require('../knexfile').development
const knex = require('knex')(config)

router.get('/api/safety-check', (req, res, next) => {
	knex('seclusion_safety_check')
		.select()
		.orderBy('check_id')
		.then(seclusion => {
			if (req.body.security < 1) {
				return next('authorized')
			}
			res.status(200).json(seclusion)
		})
		.catch(next)
})

router.get('/api/safety-check/:id', (req, res, next) => {
	knex('seclusion_safety_check')
		.select()
		.where('check_id', req.params.id)
		.then(seclusion => {
			if (req.body.security < 1) {
				return next('authorized')
			}
			res.status(200).json(seclusion[0])
		})
		.catch(next)
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
				.catch(error => {
					next(error)})
		})
		.catch(error => next(error))
})

router.put('/api/safety-check/:id', (req, res, next) => {
	knex('seclusion_safety_check')
		.where('check_id', req.params.id)
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
			if (check === 0) return next('check_id does not exist')
			res.status(200).json(check)
		})
		.catch(next)
})

module.exports = router