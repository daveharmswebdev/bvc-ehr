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
      password: '123' 
    }),
  ]);
};
