'use strict'

const { Router } = require('express')
const router = Router()

router.get('/assess', (req,res) => {
	res.send({})
})

module.exports = router