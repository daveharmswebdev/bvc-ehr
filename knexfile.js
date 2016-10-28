'use strict'
// Update with your config settings.

module.exports = {

  testing: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'bvctesting',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'bvcdev',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname + '/seedsDev'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: '45.55.225.72',
      port: 5432,
      database: 'bvc-ehr',
      user:     'digitalOceanUser',
      password: 'qwerty123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
