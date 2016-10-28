'use strict'

exports.seed = function(knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('staff').insert({
    	user_name: 'cougar',
      last_name: 'Walker',
      first_name: 'Maggie',
      role: 'rn',
      security_level: 2,
      unit: 'A',
      password: '$2a$10$BSU/YkppQ8xByvhU1oP8IOVaRKTU5e1hRCO2nVi8TZD1.U0d9LDg2' 
    }),
  ]);
};
