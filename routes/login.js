'use strict'

const { Router } = require('express')
const router = Router()

router.get('/api/login', (req,res) => {
	res.send({})
})

module.exports = router