'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('patient').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('patient')
          .insert({
            patient_id: 1, 
            last_name: 'White',
            first_name: 'Barry',
            middle_initial: 'O',
            birth_date: '1972-7-7',
            street_address: '2600 Anywhere Street',
            city: 'Knoxville',
            state: 'TN',
            zip: '37901'
          }),

      ]);
    });
};
