'use strict'

const { Router } = require('express')
const router = Router()

router.get('/report', (req,res) => {
	res.send({})
})

module.exports = router