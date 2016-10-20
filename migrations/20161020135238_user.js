'use strict'

exports.up = (knex, Promise) => {
  return Promise.all([
  	knex.schema.createTable('user', table => {
  		table.increments('user_id').primary()
  		table.string('last_name')
  		table.string('first_name')
  		table.string('middle_initial')
  		table.string('role')
  		table.string('security_level')
  	})
	])
}

exports.down = (knex, Promise) => {

  return Promise.all([
  	knex.schema.dropTable('user')
	])
}
