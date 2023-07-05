const auth = require("./auth.controller");
const profile = require("./profile.controller");
const project = require("./project.controller");
const public = require("./public.controller");

module.exports = {
   auth,
   project,
   public,
   profile,
};
