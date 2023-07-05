const express = require('express');
const app = express();

const auth = require('./auth.route');
const verify = require('./verify.route');
const organisation = require('./organisation.route');
const profile = require('./profile.route');

app.use('/auth', auth);
app.use('/user', verify);
app.use('/onboard', organisation);
app.use('/profile', profile);

module.exports = app;