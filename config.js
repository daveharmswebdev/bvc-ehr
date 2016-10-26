const knexConfig = require('./knexfile')

module.exports.knexConfig = knexConfig[process.env.NODE_ENV || 'development']