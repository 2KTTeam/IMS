const express = require("express");
const app = express();

const auth = require("./auth.route");
const user = require("./user.route");
const profile = require("./profile.route");
const project = require("./project.route");
const public = require("./public.route");

app.use("/auth", auth);
app.use("/users", user);
app.use("/profile", profile);
app.use("/projects", project);
app.use("/public", public);

module.exports = app;
