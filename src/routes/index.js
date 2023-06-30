const express = require('express');
const version1 = require('./v1');
const version2 = require('./v2');

const app = express();

app.use('/v1', version1);
app.use('/v2', version2);

module.exports = app;