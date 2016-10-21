'use strict'

const { Router } = require('express')
const router = Router()

router.get('/admit', (req,res) => {
	res.send({})
})

module.exports = router