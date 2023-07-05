const express = require("express");
const app = express();

const auth = require("./auth.route");
const project = require("./project.route");
const public = require("./public.route");

app.use("/auth", auth);
app.use("/projects", project);
app.use("/public", public);

// app.use("/uploads", uploader);

module.exports = app;
