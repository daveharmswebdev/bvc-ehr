'use strict'

const { Router } = require('express')
const router = Router()

router.get('/intervention', (req,res) => {
	res.send({})
})

module.exports = router