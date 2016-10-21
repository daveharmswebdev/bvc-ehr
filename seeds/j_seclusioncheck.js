'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('seclusion_safety_check').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('seclusion_safety_check').insert({
          check_id: 1, 
          seclusion_id: 1,
          user_id: 1,
          check_time: '10-20-16 20:15:04',
          patient_safe: true,
          toileting_offered: true,
          food_offered: true,
          activity: 'resting',
          disposition: 'calm'
        }),
      ]);
    });
};