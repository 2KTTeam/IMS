const express = require("express");
const app = express();

const profile = require("./profile.route");
const auth = require("./auth.route");
const project = require("./project.route");
const public = require("./public.route");
const user = require("./user.route");

app.use("/auth", auth);
app.use("/users", user);
app.use("/projects", project);
app.use("/public", public);

module.exports = app;
