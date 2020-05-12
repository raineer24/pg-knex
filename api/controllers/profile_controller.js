const UserProfile = require("../../models/user_profile");
const User = require("../../models/users");
const passport = require("passport");

const getTest = (req, res, next) => {
  res.json({ msg: "Profile works" });
};

const getProfile = (req, res, next) => {
  UserProfile.query()
    .findById(req.user.id)
    .eager("user")
    .then(userprofile => res.json(userprofile));
};

const createProfile = (req, res, next) => {
  //passport.authenticate("jwt", { session: false });
  res.json({ msg: "Profile works" });
};

module.exports = { getTest, createProfile, getProfile };
