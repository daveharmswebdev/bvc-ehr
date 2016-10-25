'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('seclusion').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('seclusion').insert({
          seclusion_id: 1, 
          intervention_id: 1,
          user_id: 1,
          start_time: '10-20-16 20:01:16',
          end_time: '10-20-16 20:16:57',
          physician1: 'Dr. Jones',
          physician2: 'Dr. Smith'
        }),

        knex('seclusion').insert({
          seclusion_id: 2, 
          intervention_id: 2,
          user_id: 1,
          start_time: '10-20-16 20:01:16',
          end_time: '10-20-16 20:16:57',
          physician1: 'Dr. Jones',
          physician2: 'Dr. Smith'
        }),
      ]);
    });
};