var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '""',
  API_HOST_MALL: '""',
  H5_HOST: '"localhost:8080"'
})
