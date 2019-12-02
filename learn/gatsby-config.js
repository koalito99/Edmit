require('ts-node').register();
const generateGatsbyConfiguration = require("./lib/config").generateGatsbyConfiguration;

const config = require('./configuration');

module.exports = generateGatsbyConfiguration(config);
