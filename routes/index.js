'use strict'

const { Router } = require('express')
const router = Router()

// routes
const home = require('./home')
const login = require('./login')
const register = require('./register')
const patient = require('./patient')
const admit = require('./admit')
const assess = require('./assess') 

// public routes
router.use(register)
router.use(login)

// private routes
router.use(home)
router.use(patient)
router.use(admit)
router.use(assess)

module.exports = router