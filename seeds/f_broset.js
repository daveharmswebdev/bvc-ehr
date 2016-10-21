'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('broset').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('broset').insert({
          broset_id: 1, 
          admission_id: 1,
          user_id: 1,
          confused: true,
          irritable: true,
          boisterous: true,
          verbal_threats: false,
          physical_threats: true,
          attacking_furniture: false
        }),
        knex('broset').insert({
          broset_id: 2, 
          admission_id: 1,
          user_id: 1,
          confused: true,
          irritable: true,
          boisterous: true,
          verbal_threats: false,
          physical_threats: true,
          attacking_furniture: false
        }),
        knex('broset').insert({
          broset_id: 3, 
          admission_id: 1,
          user_id: 1,
          confused: true,
          irritable: true,
          boisterous: true,
          verbal_threats: false,
          physical_threats: true,
          attacking_furniture: false
        }),
      ]);
    });
};