'use strict'

const { Router } = require('express')
const router = Router()

router.get('/register', (req,res) => {
	res.send({})
})

module.exports = router