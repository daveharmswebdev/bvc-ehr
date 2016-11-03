'use strict'

const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/login')

router.get('/api/login', (req,res) => {
	res.send({})
})

router.post('/api/login', ctrl.create)

module.exports = router