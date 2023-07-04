const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const asyncHandler = require("express-async-handler");
const { onboardOrganisation } = require("../../validators");

router.post('/onboard-organisation', onboardOrganisation, asyncHandler(handler.organisation.onboardOrgnisation) );


module.exports = router;          