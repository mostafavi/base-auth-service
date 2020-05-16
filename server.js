const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 4000;
const porte = process.env.PORT;
console.log(`Your port is ${porte}`);
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

server.listen(port, (pr) => {
    console.log(pr);
    console.log("SERVICE START LISTENING PORT: {port}");
});