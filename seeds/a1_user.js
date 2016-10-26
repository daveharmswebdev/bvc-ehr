'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('staff').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('staff').insert({
          last_name: 'Harms',
          first_name: 'Walter',
          middle_initial: 'D',
          role: 'manager',
          security_level: 3 
        }),
      ]);
    });
};
