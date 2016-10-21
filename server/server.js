'use strict'

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000
const routes = require('../routes')

app.use(routes)

app.listen(PORT, () => {
	console.log('now listening on port', PORT)
})

module.exports = app