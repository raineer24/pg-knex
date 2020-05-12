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

const getProfile = async (req, res, next) => {
  try {
    const user = UserProfile.query()
      .findById(req.user.id)
      .eager("user")
      .then(userprofile => {
        console.log("userprofile", userprofile);
        if (userprofile === undefined) {
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

const createProfile = (req, res, next) => {
  //passport.authenticate("jwt", { session: false });
  res.json({ msg: "Profile works" });
};

module.exports = { getTest, createProfile, getProfile };
