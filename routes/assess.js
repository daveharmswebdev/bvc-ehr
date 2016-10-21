'use strict'

const { Router } = require('express')
const router = Router()

router.get('/api/assess', (req,res) => {
	res.send({})
})

module.exports = router