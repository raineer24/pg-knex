const express = require("express");
const router = express.Router();
const passport = require("passport");

const { getTest, createProfile } = require("../controllers/profile_controller");

//@route GET /api/v2/user/profile
//@desc Tests profile route
//@access Public
router.get("/test", getTest);

//@route POST /api/v2/user/profile
//@desc Create user profile
//@access Private
router.post("/", createProfile);

module.exports = router;