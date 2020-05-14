const UserProfile = require("../../models/user_profile");
const User = require("../../models/users");
const UserSkillSet = require("../../models/user_skill_set");
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
    const user = await UserProfile.query()
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

    console.log("user", user);
  } catch (error) {
    throw error;
  }
};

// @route  POST /api/v2/user/profile
// @desc   Create or Edit user profile
// @access Private - use jwt strategy to authenticate
const createProfile = async (req, res, next) => {
  // Get all fields needed for a user profile
  const profileFields = {};

  profileFields.user = req.user.id;

  //Check for other form data

  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company_name) profileFields.company_name = req.body.company_name;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.job_location) profileFields.job_location = req.body.job_location;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.youtube_handle)
    profileFields.youtube_handle = req.body.youtube_handle;
  if (req.body.twitter_handle)
    profileFields.twitter_handle = req.body.twitter_handle;
  if (req.body.facebook_handle)
    profileFields.facebook_handle = req.body.facebook_handle;
  if (req.body.instagram_handle)
    profileFields.instagram_handle = req.body.instagram_handle;

  // const user = await UserProfile.query()
  //   .findById(req.user.id)
  //   .eager("user");

  const data = {
    skill_set_name: req.body.skill_set_name
  };
  console.log("data", data);

  // const user = await UserProfile.query()
  //   .findById(req.user.id)
  //   .then(profile => {
  //     if (profile) {
  //     } else {
  //       //create+
  //       const handle = UserProfile.query().findOne(
  //         "handle",
  //         profileFields.handle
  //       );
  //       console.log("handle", handle);
  //     }
  //   });

  //const user = await UserSkillSet.query();
  // const user = await User.query()
  //   .eager("user_profile.[user_skill_set]")
  //   .findById(req.user.id);
  //console.log("user", user);

  // var query = Knex.insert("messages")
  //   .insert({
  //     key: 12345,
  //     references: ["abc", "def", "ghi"],
  //     data: { a: 1, b: 2 }
  //   })
  //   .toString();

  // select skills
  const user = UserSkillSet.query()
    .select("skill_set_name")
    .map(data => data.skills)
    .then(skills => console.log(skills));

  //const signup = await registerUser(data);
  // const skills1 = user.user_profile[0];
  // const skills = user.user_profile[0].user_skill_set.skill_set_name.skills;
  // console.log("user", typeof skills1);

  // return User.query()+
  //   .where("user_id", req.user.id)
  //   .join("userprojects", "user.id", "=", "userprojects.user_id")
  //   .join("project", "project.id", "=", "userprojects.project_id")
  //   .select("user.id", "userprojects.project_id", "project.name");
  // console.log("user", user);

  // if (user) {
  //   //update
  // } else {
  //   //create
  //   const handle = await UserProfile.query().findOne(
  //     "handle",
  //     profileFields.handle
  //   );
  //   console.log("handle", handle);
  // }
};

async function registerUser(datus) {
  try {
    const result = await UserSkillSet.query().insertAndFetch(datus);

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { getTest, createProfile, getProfile };
