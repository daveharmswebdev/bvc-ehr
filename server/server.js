'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const { cyan } = require('chalk')

const routes = require('../routes')

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
	app.locals.pretty = true
}

app.locals.errors = {}
app.locals.body = {}

// middlewares
app.use(session({
  store: new RedisStore({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || 'pizzadescottsupersecretkey',
}))

app.use(({ method, url, headers: { 'user-agent': agent } }, res, next) => {
	if (process.env.NODE_ENV !== 'testing') {
	  const timeStamp = new Date()
	  console.log(`[${timeStamp}] "${cyan(`${method} ${url}`)}" "${agent}"`)
	}
  next()
})

app.use(express.static('client'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// routes
app.use(routes)

app.listen(PORT, () => {
	console.log('now listening on port', PORT)
})

module.exports = app