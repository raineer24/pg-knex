const UserProfile = require("../../models/user_profile");
const User = require("../../models/users");

const getTest = (req, res, next) => {
  res.json({ msg: "Profile works" });
};

const getProfile = (req, res, next) => {
  // UserProfile.query()
  //   .withGraphFetched("users")
  //   .then(todos => console.log(todos));

  // UserProfile.query().then(user => {
  //   res.json({
  //     user
  //   });
  // });
  UserProfile.query()
    .eager("user")
    .then(todos => console.log("userprofile: ", todos));

  // const people = await UserProfile.query().withGraphFetched("pets");

  // console.log(people[0].pets[0].name);
};

const createProfile = (req, res, next) => {
  res.json({ msg: "Profile works" });
};

module.exports = { getTest, createProfile, getProfile };
