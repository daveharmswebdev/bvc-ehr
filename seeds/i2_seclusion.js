'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    // Inserts seed entries
    knex('seclusion').insert({
      intervention_id: 2,
      user_id: 1,
      start_time: '10-20-16 20:01:16',
      end_time: '10-20-16 20:16:57',
      physician1: 'Dr. Jones',
      physician2: 'Dr. Smith'
    }),
      ]);
};