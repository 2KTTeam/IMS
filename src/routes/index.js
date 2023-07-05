const express = require("express");
const version1 = require("./v1");

const app = express();

app.use("/v1", version1);

module.exports = app;
