'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    // Inserts seed entries
    knex('staff').insert({
      user_name: 'viper',
      last_name: 'Bateman',
      first_name: 'Patrick',
      middle_initial: 'F',
      role: 'technician',
      security_level: 1,
      unit: 'B',
      password: '$2a$10$BSU/YkppQ8xByvhU1oP8IOVaRKTU5e1hRCO2nVi8TZD1.U0d9LDg2'
    })
  ]);
};
