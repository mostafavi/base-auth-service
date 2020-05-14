const port = process.env.PORT || 4000;

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

server.listen(port, () => {
    console.log('SERVICE START LISTENING PORT: ' + port);
});