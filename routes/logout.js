'use strict'

const { Router } = require('express')
const router = Router()

router.get('/api/logout', (req, res) => {
	req.logout()
	console.log('req.user', req.user)
	res.status(200).json({status:'bye'})
})

module.exports = router