'use strict'

const { Router } = require('express')
const router = Router()
const config = require('../knexfile').development
const knex = require('knex')(config)

router.get('/api/broset', (req, res, next) => {
	knex('broset')
		.select()
		.then(broset => {
			console.log('broset', broset)
			res.status(200).json(broset)
		})
})

module.exports = router