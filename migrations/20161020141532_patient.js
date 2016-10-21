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
  	}),

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
  	}),

  	knex.schema.createTable('assessment', table => {
  		table.integer('assessment_id').primary()
  		table.integer('admission_id')
  			.references('admission_id')
  			.inTable('admission')
  		table.boolean('oriented_person')
  		table.boolean('oriented_place')
  		table.boolean('oriented_time')
  		table.boolean('oriented_purpose')
  		table.boolean('suicidal')
  		table.string('suicidal_plan')
  		table.boolean('homicidal')
  		table.string('homidical_plan')
  		table.string('visual_hallucinations')
  		table.string('audio_hallucinations')
  		table.string('tactile_hallucinations')
  		table.string('hallucination_comments')
  		table.string('affect')
  		table.string('appetite')
  		table.string('appearance')
  		table.string('speech')
  		table.integer('nurse_assessing')
  			.references('user_id')
  			.inTable('user')
  		table.timestamp('charted_at')
  	}),

  	// knex.schema.createTable('discharge', table => {
  		
  	// }),
  	
  	// knex.schema.createTable('', table => {}),
  	// knex.schema.createTable('', table => {}),
  	// knex.schema.createTable('', table => {}),
  	// knex.schema.createTable('', table => {})
	])
}

exports.down = (knex, Promise) => {
  return Promise.all([
  	knex.schema.dropTable('discharge'),
  	knex.schema.dropTable('assessment'),
  	knex.schema.dropTable('admission'),
  	knex.schema.dropTable('patient'),
  	knex.schema.dropTable('user')
	])
}
