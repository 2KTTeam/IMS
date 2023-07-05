const auth = require("./auth.controller");
const user = require("./user.controller");
const project = require("./project.controller");
const public = require("./public.controller");
const profile = require("./profile.controller");

module.exports = {
   auth,
   user,
   project,
   public,
   profile
};
