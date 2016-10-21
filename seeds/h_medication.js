'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('medication').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('medication').insert({
          medication_id: 1, 
          intervention_id: 1,
          user_id: 1,
          medication: 'ativan',
          dose: 2,
          units: 'mg',
          route: 'sub-cutaneous'
        }),
      ]);
    });
};