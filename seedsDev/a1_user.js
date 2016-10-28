'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('staff').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('staff').insert({
          user_name: 'maverick',
          last_name: 'Harms',
          first_name: 'Walter',
          middle_initial: 'D',
          role: 'manager',
          security_level: 3,
          unit: 'A',
          password: '$2a$10$BSU/YkppQ8xByvhU1oP8IOVaRKTU5e1hRCO2nVi8TZD1.U0d9LDg2' 
        }),
      ]);
    });
};
