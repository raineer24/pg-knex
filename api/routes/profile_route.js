const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getTest1,
  createProfile,
  getProfile,
  createExpProfile,
  AllProfiles
} = require("../controllers/profile_controller");

const validation = require("../../validation/express-profile");

//@route GET /api/v2/users/profile/getProfiles
// @desc     Get all profiles
// @access   Public
router.get("/getProfiles", AllProfiles);

//@route GET /api/v2/users/profile
// @desc  Get current user's profile
// @access Private - use jwt strategy to authenticate
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  getProfile
);

//@route POST /api/v2/users/profile
// @desc   Create or Edit user profile
// @access Private - use jwt strategy to authenticate
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validation.validateProfile,
  createProfile
);

// @route POST api/profile/experience
// @desc  Add experience to profile
// @access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  createExpProfile
);

module.exports = router;
