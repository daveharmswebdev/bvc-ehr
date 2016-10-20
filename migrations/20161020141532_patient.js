'use strict'

exports.up = (knex, Promise) => {
  
  return Promise.all([
  	knex.schema.createTable('patient', table => {
  		table.increments('patient_id').primary()
  		table.string('last_name')
  		table.string('first_name')
  		table.string('middle_initial')
  		table.date('birth_date')
  		table.string('street_address')
  		table.string('city')
  		table.string('state')
  		table.string('zip')
  	}),

  	knex.schema.createTable('admission', table => {
  		table.increments('admission_id').primary()
  		table.integer('patient_id').references('patient_id').inTable('patient')
  		table.integer('admission_rn').references('user_id').inTable('user')
  		table.string('voluntary_status')
  		table.string('complaint')
  		table.string('symptoms')
  		table.boolean('suicidal')
  		table.string('suicidal_plan')
  		table.boolean('homicidal')
  		table.string('homicidal_who')
  		table.string('homidical_plan')
  		table.string('behavioral_health_hx')
  		table.string('medical_hx')
  		table.string('current_meds')
  		table.boolean('smoker')
  	})
	])
}

exports.down = (knex, Promise) => {
  return Promise.all([
  	knex.schema.dropTable('admission'),
  	knex.schema.dropTable('patient')
	])
}
