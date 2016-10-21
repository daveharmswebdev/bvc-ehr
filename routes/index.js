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
const broset = require('./broset')
const intervention = require('./intervention')
const medication = require('./medication')
const seclusion = require('./seclusion')
const safetyCheck = require('./safety-check')
const discharge = require('./discharge')
const report = require('./report')

// public routes
router.use(register)
router.use(login)

// private routes
router.use(home)
router.use(patient)
router.use(admit)
router.use(assess)
router.use(broset)
router.use(intervention)
router.use(medication)
router.use(seclusion)
router.use(safetyCheck)
router.use(discharge)
router.use(report)

module.exports = router