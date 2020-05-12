const UserProfile = require("../../models/user_profile");
const User = require("../../models/users");
const passport = require("passport");

const {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} = require("../../helpers/error_helper");

const getTest = (req, res, next) => {
  res.json({ msg: "Profile works" });
};

// @route    GET /api/v2/user/profile
// @desc     Get current user's profile
// @access   Private
const getProfile = async (req, res, next) => {
  try {
    const user = UserProfile.query()
      .findById(req.user.id)
      .eager("user")
      .then(userprofile => {
        console.log("userprofile", userprofile);
        if (userprofile === "undefined") {
          return next(
            createError({
              status: CONFLICT,
              message: "There is no profile for this user"
            })
          );
        }
      });
  } catch (error) {
    throw error;
  }
};

// @route  POST /api/v2/user/profile
// @desc   Create or Edit user profile
// @access Private - use jwt strategy to authenticate
const createProfile = (req, res, next) => {
  // Get all fields needed for a user profile
  const profileFields = {};

  profileFields.user = req.user.id;
  console.log("profilefields.user", profileFields.user);
};

module.exports = { getTest, createProfile, getProfile };
