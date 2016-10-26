'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    // Inserts seed entries
    knex('assessment').insert({
      admission_id: 1,
      oriented_person: true,
      oriented_place: true,
      oriented_time: true,
      oriented_purpose: true,
      suicidal: true,
      suicidal_plan: 'overdose on medication, narcotics at home',
      homicidal: false,
      hallucination_comments: 'denies all hallucinations',
      affect: 'flat',
      appetite: 'normal',
      appearance: 'groomed',
      speech: 'normal, but low in volume',
      nurse_assessing: 1,
      charted_at: knex.fn.now() 
    }),
      ]);
};
