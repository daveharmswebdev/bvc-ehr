'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('admission').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('admission')
          .insert({
            admission_id: 1, 
            patient_id: 1,
            admission_rn: 1,
            voluntary_status: 'voluntary',
            complaint: 'sucidal ideation',
            symptoms: 'depression crying insomnia',
            suicidal: true,
            suicidal_plan: 'intentional overdose of narcotic pain medication',
            homicidal: false,
            behavioral_health_hx: 'depressed since age 10, one past attempt at age 26.',
            medical_hx: 'type 1 diabetes',
            current_meds: 'prozac insulin',
            smoker: false
          }),

      ]);
    });
};
