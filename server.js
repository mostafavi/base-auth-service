
const logger = require('./interconnects/logger');

const dotenv = require('dotenv');
dotenv.config();

// module variables
const config = require('./service.config.json');
const environment = process.env.NODE_ENV || 'development';
const defaultConfig = config[environment];
console.log(environment);
console.log(defaultConfig);
defaultConfig.service.port = process.env.PORT || defaultConfig.service.port;

global.config = {
  enviroment: environment,
  vars: defaultConfig
};






/*
const fs = require('fs');

const options = {
  key: fs.readFileSync(config.domain.key),
  cert: fs.readFileSync(config.dimain.cert)
};
*/

const https = require('http');
const service = require('./service');

const server = https.createServer(service);

logger.log(`Running in ${global.config.enviroment} mode.`);
server.listen(global.config.vars.service.port, (pr) => {
  logger.log(`Service listening to port : ${global.config.vars.service.port}`);
});