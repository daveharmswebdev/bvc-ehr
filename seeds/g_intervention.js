'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('intervention').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('intervention').insert({
          admission_id: 1,
          user_id: 1,
          intervention: 'medication',
          intervention_note: 'forced medication'
        }),

        knex('intervention').insert({
          admission_id: 1,
          user_id: 1,
          intervention: 'seclusion',
          intervention_note: 'no trauma to patient during seclusion'
        }),

        knex('intervention').insert({
          admission_id: 1,
          user_id: 1,
          intervention: 'seclusion',
          intervention_note: 'no trauma to patient during seclusion'
        }),
      ]);
    });
};