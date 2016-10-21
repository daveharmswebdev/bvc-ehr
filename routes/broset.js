'use strict'

const { Router } = require('express')
const router = Router()

router.get('/broset', (req,res) => {
	res.send({})
})

module.exports = router