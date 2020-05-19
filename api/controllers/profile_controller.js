const UserProfile = require("../../models/user_profile");
const User = require("../../models/users");
const UserSkillSet = require("../../models/user_skill_set");
const UserExperience = require("../../models/user_exp");
const passport = require("passport");
const log = require("color-logs")(true, true, "User Profile");

const {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} = require("../../helpers/error_helper");

const getTest = (req, res, next) => {
  res.json({ msg: "Profile works" });
};

// @route POST api/profile/experience
// @desc  Add experience to profile
// @access Private
const createExpProfile = async (req, res, next) => {
  const {
    job_title,
    company_name,
    job_location,
    start_date,
    end_date,
    current,
    description
  } = req.body;

  const newExp = {
    job_title,
    company_name,
    job_location,
    start_date,
    end_date,
    current,
    description
  };

  try {
    const profile = await UserExperience.query().findById(req.user.id);
    if (profile) {
      return next(
        createError({
          status: CONFLICT,
          message: "Already added experience profile"
        })
      );
    } else {
      console.log("experience profile doesn`t exist");

      const profileExpCreate = await registerExpProfile(newExp);
      return res.status(200).json(profileExpCreate);
    }
  } catch (error) {
    log.error(`Profile controller[createExpProfile]: Failed to send ${error}`);

    return next(error);
  }
};

// @route    GET /api/v2/user/profile
// @desc     Get current user's profile
// @access   Private
const getProfile = async (req, res, next) => {
  try {
    const user = await UserProfile.query()
      .findById(req.user.id)
      .eager("user_skill_set")
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
        res.json(userprofile);
      });

    // const user = await User.query()
    //   .eager("user_profile")
    //   .findById(req.user.id);
    // console.log("user", user);

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

  try {
    const data = {
      users_id: req.user.id,
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

    //console.log("data", data);

    const profile = await UserProfile.query().findById(req.user.id);
    if (profile) {
      return next(
        createError({
          status: CONFLICT,
          message: "Already added profile"
        })
      );
    } else {
      const profileCreate = await registerProfile(data);
      return res.status(200).json(profileCreate);
    }
  } catch (error) {
    log.error(`Profile controller[createProfile]: Failed to send ${error}`);

    return next(error);
  }
};

async function registerProfile(datus) {
  try {
    // const result = await UserSkillSet.query().insertAndFetch(datus);
    const result = await UserProfile.query().insertGraph(datus);

    return result;
  } catch (error) {
    throw error;
  }
}
async function registerExpProfile(datus) {
  try {
    const result = await UserExperience.query().insertGraph(datus);

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { getTest, createProfile, getProfile, createExpProfile };
