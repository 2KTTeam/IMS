const app = require("./app.js");
const { DB, ENV } = require("./configs");

const MONGO_URL = ENV.dbUrl;
const port = ENV.port

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
