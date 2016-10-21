'use strict'

const config = require('../knexfile').development
const knex = require('knex')(config)

function getAll() {
	return knex('broset').select()
}

module.exports = { getAll:getAll }