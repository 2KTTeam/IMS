const app = require("./app.js");
const { DB, ENV } = require("./configs");

const MONGO_URL = ENV.dbUrl;
const port = ENV.port;

const start = async () => {

  try {
    const connected = await DB(MONGO_URL);
    if (connected) {
      app.listen(port, () => {
        console.log(`server is listening on port ${port}`);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

start();

// for secure server using https, you need to configure the openssl in your system.
// then link to it like i did, but since
/**
const https = require('https');
const fs = require('fs');
const app = require('./app');
const { DB, ENV } = require('./configs');

const MONGO_URL = ENV.dbUrl;
const port = ENV.port;
const certificatePath = "/home/assocmaster/certificate.pem"; 
const privateKeyPath  = "/home/assocmaster/private-key.pem"

const start = async () => {
  try {
    const connected = await DB(MONGO_URL);
    if (connected) {
      // Read the private key and certificate files
      const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
      const certificate = fs.readFileSync(certificatePath, 'utf8');

      // Create the HTTPS server
      const server = https.createServer(
        {
          key: privateKey,
          cert: certificate
        },
        app
      );

      // Start the server
      server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

start();

 */
