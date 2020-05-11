const UserProfile = require("../../models/user_profile");
const User = require("../../models/users");
const passport = require("passport");

const getTest = (req, res, next) => {
  res.json({ msg: "Profile works" });
};

const getProfile = (req, res, next) => {
  console.log(req.user.id);

  // User.query().then(user => {
  //   res.json({
  //     id: req.user.id,
  //     first_name: req.user.first_name,
  //     email: req.user.email
  //   });
  // });
  //console.log(req.user);

  // UserProfile.query()
  //   .withGraphFetched("users")
  //   .then(todos => console.log(todos));

  // UserProfile.query().then(user => {
  //   res.json({
  //     user
  //   });
  // });
  UserProfile.query()
    .findById(req.user.id)
    .eager("user")
    .then(userprofile => res.json(userprofile));
  // UserProfile.query()
  //   .eager("user")
  //   .then(todos => console.log("userprofile: ", todos));
  // const userprofile = await User.query().eager("user_profile");

  // const userprofile = await User.query()
  //   .eager("user_profile")
  //   .findById(userprofile);

  //const userprofile = await User.query();

  // console.log("userprofike", userprofile);

  // const people = await UserProfile.query().withGraphFetched("pets");

  // console.log(people[0].pets[0].name);
};

const createProfile = (req, res, next) => {
  //passport.authenticate("jwt", { session: false });
  res.json({ msg: "Profile works" });
};

module.exports = { getTest, createProfile, getProfile };
