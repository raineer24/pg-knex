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

    // console.log("user", user);
  } catch (error) {
    throw error;
  }
};

// @route  POST /api/v2/user/profile
// @desc   Create or Edit user profile
// @access Private - use jwt strategy to authenticate
const createProfile = async (req, res, next) => {
  // Get all fields needed for a user profile

  //Check for other form data

  let areaExpertise = req.body.areas_of_expertise;

  const {
    company_name,
    website,
    job_location,
    status,
    bio,
    youtube_handle,
    twitter_handle,
    facebook_handle,
    instagram_handle
  } = req.body;

  const skill_set_name =
    typeof areaExpertise === "string" ? [areaExpertise] : areaExpertise;

  console.log(skill_set_name);

  const data = {
    company_name,
    website,
    job_location,
    status,
    bio,
    youtube_handle,
    twitter_handle,
    facebook_handle,
    instagram_handle,
    user_skill_set: [
      {
        skill_set_name: skill_set_name
      }
    ]
  };

  async function updateProfile() {
    const updateProfile = await UserProfile.query()
      .findById(req.user.id)
      .patch({ website: "richcoooper.com.ph", bio: "kobe killah" })
      .returning("*");
    return updateProfile;
  }
  updateProfile();

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

  // const obj = { skill_set_name: { skills: "c#, dot.net" } };

  // UserSkillSet.query()
  //   .insert(profileFields)
  //   .then(console.log)
  //   .catch(console.error);

  //const user = await UserSkillSet.query();

  // const user = await User.query()
  //   .eager("user_profile.[user_skill_set]")
  //   .findById(req.user.id);
  // console.log("user", user);

  // const user = await User.query()
  //   .eager("user_skill")
  //   .modifyEager("user_skill", builder => builder.select("skill_set_name"))
  //   //.whereIn('has_skills.id', skillIds)
  //   .findById(req.user.id)
  //   .debug()
  //   .then(data => {
  //     console.log("DATA", data.user_skill);
  //     skill = data.user_skill;
  //     if (Array.isArray(skill)) {
  //       console.log("array!");
  //     }
  //     skill.forEach(function(item) {
  //       console.log(item.skill_set_name);
  //     });
  //   });

  //const user = await User.query();
  //   //select("users")
  //   // Use .eager instead of .joinEager as pagination doesn't work with it due to joins.
  //   .eager("user_skill")
  //   // Optional: Populating the matched skills
  //   .modifyEager("user_skill", builder => builder.select("user_skill"))
  //   .then(console.log);
  //console.log("user  : ", user);

  // User.query()
  //   .findById(req.user.id)
  //   .select("id")
  //   .eager("user_skill")
  //   .filterEager("user_skill", builder => {
  //     builder.select("skill_set_name");
  //   })
  //   .debug()
  //   .then(console.log);

  // User.query()
  //   .findById(req.user.id)
  //   .select("id")
  //   .eager("user_skill")
  //   .filterEager("user_skill", builder => {
  //     builder.select("skill_set_name");
  //   })
  //   .debug()
  //   .then(data => {
  //     //console.log("DATA", data.user_skill);
  //     console.log("DATA", data);
  //   });

  // var query = Knex.insert("messages")
  //   .insert({
  //     key: 12345,
  //     references: ["abc", "def", "ghi"],
  //     data: { a: 1, b: 2 }
  //   })
  //   .toString();

  // .filterEager('purchases', builder => {
  //   builder.select('id', 'transaction_id');
  // })
  // .debug()
  // .then(console.log);

  // // select skills
  // const user = UserSkillSet.query()
  //   .select("skill_set_name")
  //   .map(data => data.skills)
  //   .then(skills => {
  //     //console.log(skills[1]);
  //     let x = skills[1];
  //     //var array = x.split(",");
  //     a = x[0];
  //     //a.split(",");
  //     let arr = a.split(",");
  //     console.log(arr);

  //     // if (Array.isArray(x)) {
  //     //   console.log("array!");
  //     // }
  //   });

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
