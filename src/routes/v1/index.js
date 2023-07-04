const express = require('express');
const app = express();

const auth = require('./auth.route');
const verify = require('./verify.route');
const uploader = require('./uploads.route');

app.use('/auth', auth);
app.use('/user', verify);
app.use('/uploads', uploader);


module.exports = app;