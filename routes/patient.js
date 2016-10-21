'use strict'

const { Router } = require('express')
const router = Router()

router.get('/patient', (req,res) => {
	res.send({})
})

module.exports = router