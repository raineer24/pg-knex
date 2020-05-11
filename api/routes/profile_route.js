const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getTest,
  createProfile,
  getProfile
} = require("../controllers/profile_controller");

//@route GET /api/v2/user/profile
//@desc Tests profile route
//@access Public
router.get("/", passport.authenticate("jwt", { session: false }), getProfile);

//@route POST /api/v2/user/profile
//@desc Create user profile
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createProfile
);

module.exports = router;
