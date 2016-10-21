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
  		table.increments('assessment_id').primary()
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

  	knex.schema.createTable('discharge', table => {
  		table.increments('discharge_id').primary()
  		table.integer('admission_id')
  			.references('admission_id')
  			.inTable('admission')
  		table.integer('discharge_rn')
  			.references('user_id')
  			.inTable('user')
  		table.dateTime('discharge_date_time')
  		table.string('discharge_to')
  		table.string('self_other')
  		table.string('discharge_note')
  		table.boolean('suicidal')
  		table.string('suicidal_plan')
  		table.boolean('homicidal')
  		table.string('homidical_plan')
  		table.boolean('comprehends_dc_plan')
  	}),

  	knex.schema.createTable('broset', table => {
  		table.increments('broset_id').primary()
  		table.integer('admission_id')
  			.references('admission_id')
  			.inTable('admission')
  		table.integer('user_id')
  			.references('user_id')
  			.inTable('user')
  		table.boolean('confused')
  		table.boolean('irritable')
  		table.boolean('boisterous')
  		table.boolean('verbal_threats')
  		table.boolean('physical_threats')
  		table.boolean('attacking_furniture')
  	}),

  	knex.schema.createTable('intervention', table => {
  		table.increments('intervention_id').primary()
  		table.integer('admission_id')
  			.references('admission_id')
  			.inTable('admission')
  		table.integer('user_id')
  			.references('user_id')
  			.inTable('user')
  		table.string('intervention')
  		table.string('intervention_note')
  	}),

  	knex.schema.createTable('medication', table => {
  		table.increments('medication_id').primary()
  		table.integer('intervention_id')
  			.references('intervention_id')
  			.inTable('intervention')
  		table.integer('user_id')
  			.references('user_id')
  			.inTable('user')
  		table.string('medication')
  		table.float('dose')
  		table.string('units')
  		table.string('route')
  	}),

  	knex.schema.createTable('seclusion', table => {
  		table.increments('seclusion_id').primary()
  		table.integer('intervention_id')
  			.references('intervention_id')
  			.inTable('intervention')
  		table.integer('user_id')
  			.references('user_id')
  			.inTable('user')
  		table.dateTime('start_time')
  		table.dateTime('end_time')
  		table.string('physician1')
  		table.string('physician2')
  	}),

  	knex.schema.createTable('seclusion_safety_check', table => {
  		table.increments('check_id').primary()
  		table.integer('seclusion_id')
  			.references('seclusion_id')
  			.inTable('seclusion')
  		table.integer('user_id')
  			.references('user_id')
  			.inTable('user')
  		table.dateTime('check_time')
  		table.boolean('patient_safe')
  		table.boolean('toileting_offered')
  		table.boolean('food_offered')
  		table.boolean('activity')
  		table.boolean('disposition')
  	})
	])
}

exports.down = (knex, Promise) => {
  return Promise.all([
  	knex.schema.dropTable('seclusion_safety_check'),
  	knex.schema.dropTable('seclusion'),
  	knex.schema.dropTable('medication'),
  	knex.schema.dropTable('intervention'),
  	knex.schema.dropTable('broset'),
  	knex.schema.dropTable('discharge'),
  	knex.schema.dropTable('assessment'),
  	knex.schema.dropTable('admission'),
  	knex.schema.dropTable('patient'),
  	knex.schema.dropTable('user')
	])
}
