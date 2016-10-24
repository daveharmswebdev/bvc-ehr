'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('staff').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('staff').insert({
          user_id: 1, 
          last_name: 'Harms',
          first_name: 'Walter',
          middle_initial: 'D',
          role: 'manager',
          security_level: 3 
        }),
        knex('staff').insert({
          user_id: 2, 
          last_name: 'Walker',
          first_name: 'Maggie',
          role: 'rn',
          security_level: 2 
        }),
        knex('staff').insert({
          user_id: 3, 
          last_name: 'Bateman',
          first_name: 'Patrick',
          middle_initial: 'F',
          role: 'technician',
          security_level: 1
        })
      ]);
    });
};
