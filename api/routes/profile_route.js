const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getTest1,
  createProfile,
  getProfile,
  createExpProfile
} = require("../controllers/profile_controller");

const validation = require("../../validation/express-profile");

//@route GET /api/v2/user/profile
// @desc  Get current user's profile
// @access Private - use jwt strategy to authenticate
router.get("/", passport.authenticate("jwt", { session: false }), getProfile);

//@route POST /api/v2/user/profile
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
