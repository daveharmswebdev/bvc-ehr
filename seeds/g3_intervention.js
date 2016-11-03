'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    // Inserts seed entries
    knex('intervention').insert({
      admission_id: 1,
      user_id: 1,
      intervention: 'counseling',
      intervention_note: 'opened up about drug problems'
    })
      ]);
};