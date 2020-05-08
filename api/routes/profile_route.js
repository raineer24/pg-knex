const express = require("express");
const router = express.Router();

const { getTest } = require("../controllers/profile_controller");

//@route GET/api/v2/user/profile
//@desc Tests profile route
//@access Public
router.get("/test", getTest);

module.exports = router;
