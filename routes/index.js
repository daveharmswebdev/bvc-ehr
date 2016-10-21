'use strict'

const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
	res.send({})
})

router.get('/register', (req, res) => {
	res.send({})
})

router.get('/login', (req, res) => {
	res.send({})
})

module.exports = router