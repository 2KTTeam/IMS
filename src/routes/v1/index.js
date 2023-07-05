const express = require("express");
const app = express();

const auth = require("./auth.route");
const project = require("./project.route");

app.use("/auth", auth);
app.use("/project", project);

// app.use("/uploads", uploader);

module.exports = app;
