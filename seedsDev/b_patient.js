'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('patient').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('patient')
          .insert({
            last_name: 'White',
            first_name: 'Barry',
            middle_initial: 'O',
            birth_date: '1972-7-7',
            street_address: '2600 Anywhere Street',
            city: 'Knoxville',
            state: 'TN',
            zip: '37901'
          }),
        knex('patient')
          .insert({
            last_name: 'Simpson',
            first_name: 'Homer',
            middle_initial: 'J',
            birth_date: '1962-8-17',
            street_address: '21300 Anywhere Street',
            city: 'Nashville',
            state: 'TN',
            zip: '38333'
          }),
        knex('patient')
          .insert({
            last_name: 'Manning',
            first_name: 'Peyton',
            middle_initial: 'H',
            birth_date: '1988-2-2',
            street_address: '14 Sycamore Lane',
            city: 'Ft. Walton Beach',
            state: 'FL',
            zip: '90901'
          }),

      ]);
    });
};
