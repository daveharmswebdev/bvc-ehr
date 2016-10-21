'use strict'

const { Router } = require('express')
const router = Router()

router.get('/safety-check', (req,res) => {
	res.send({})
})

module.exports = router