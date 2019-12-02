require('ts-node').register();
const generateGatsbyNodeModule = require("./lib/node").generateGatsbyNodeModule;

const config = require('./configuration');

module.exports = generateGatsbyNodeModule(config);