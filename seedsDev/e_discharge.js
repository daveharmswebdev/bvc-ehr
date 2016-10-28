'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('discharge').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('discharge').insert({
          admission_id: 1,
          discharge_rn: 1,
          discharge_date_time: knex.fn.now(),
          discharge_to: 'home',
          self_other: 'self',
          discharge_note: 'patient denies suicidal or homicidal ideation',
          suicidal: false,
          homicidal: false,
          comprehends_dc_plan: true
        }),
      ]);
    });
};