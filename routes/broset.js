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
	console.log('req.body', req.body)
	knex('broset')
		.insert({
			broset_id:4,
			admission_id: 1,
			user_id: 1,
			confused: true,
			irritable: true,
			boisterous: true,
			verbal_threats: true,
			physical_threats: true,
			attacking_furniture: true
		})
		.then( id => {
			knex('broset')
				.select()
				.where({broset_id:id[0]})
				.then( broset => {
					res.status(200).json(broset)
				})
		})
		.catch(function(error) {
			next(error)
		})
})

module.exports = router