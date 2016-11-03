'use strict'

const { Router } = require('express')
const router = Router()

// routes
const login = require('./login')
const logout = require('./logout')
const staff = require('./staff')
const patient = require('./patient')
const admit = require('./admit')
const assess = require('./assess') 
const broset = require('./broset')
const intervention = require('./intervention')
const medication = require('./medication')
const report = require('./report')

// public routes
router.use(login)
router.use(logout)

// private routes
router.use(staff)
router.use(patient)
router.use(admit)
router.use(assess)
router.use(broset)
router.use(intervention)
router.use(medication)
router.use(report)

module.exports = router