'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('intervention').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('intervention').insert({
          intervention_id: 1, 
          admission_id: 1,
          user_id: 1,
          intervention: 'medication',
          intervention_note: 'forced medication'
        }),

        knex('intervention').insert({
          intervention_id: 2, 
          admission_id: 1,
          user_id: 1,
          intervention: 'seclusion',
          intervention_note: 'no trauma to patient during seclusion'
        }),

        knex('intervention').insert({
          intervention_id: 3, 
          admission_id: 1,
          user_id: 1,
          intervention: 'seclusion',
          intervention_note: 'no trauma to patient during seclusion'
        }),
      ]);
    });
};