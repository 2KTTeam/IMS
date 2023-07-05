const express = require("express");
const app = express();

const profile = require('./profile.route');
const auth = require("./auth.route");
const project = require("./project.route");
const public = require("./public.route");

app.use("/auth", auth);
app.use("/projects", project);
app.use("/public", public);
app.use('/profile', profile);

module.exports = app;
