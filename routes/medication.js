'use strict'

const { Router } = require('express')
const router = Router()

router.get('/medication', (req,res) => {
	res.send({})
})

module.exports = router