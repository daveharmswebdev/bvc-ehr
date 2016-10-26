'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    // Inserts seed entries
    knex('staff').insert({
      last_name: 'Bateman',
      first_name: 'Patrick',
      middle_initial: 'F',
      role: 'technician',
      security_level: 1
    })
  ]);
};
