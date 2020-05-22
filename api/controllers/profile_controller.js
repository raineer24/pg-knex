const UserProfile = require("../../models/user_profile");
const User = require("../../models/users");
const UserSkillSet = require("../../models/user_skill_set");
const UserExperience = require("../../models/user_exp");
const UserEducation = require("../../models/user_edu");
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

// @route    DELETE /api/v2/users/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
const deleteExp = async (req, res, next) => {
  try {
    const profile = await UserExperience.query().findById(req.params.exp_id);
    console.log("profile", profile);

    if (!profile) {
      return next(
        createError({
          status: CONFLICT,
          message: "No experience profile found"
        })
      );
    } else {
      const profileExpDeleted = await UserExperience.query().deleteById(
        req.params.exp_id
      );
      return res.status(200).json({ success: true, profileExpDeleted });
    }
  } catch (error) {
    log.error(`Profile controller[DeleteExpProfile]: Failed to send ${error}`);

    return next(error);
  }
  // const profileExp = await UserProfile.query()
  //   .eager("[user_experience,user_skill_set]")
  //   .findById(req.user.id)
  //   .then(data => {
  //     const removeIndex = data.user_experience
  //       .map(item => item.user_experience_detail_id)
  //       .indexOf(req.params.exp_id);

  //     //splice out of array
  //     data.user_experience.splice(removeIndex, -1);
  //   });
};

//@route GET /api/v2/users/profile/getProfiles
// @desc     Get all profiles
// @access   Public
const AllProfiles = async (req, res, next) => {
  try {
    const profile = await UserExperience.query();
    console.log("profile", profile);
    // UserProfile.query()
    //   .eager("[user_experience,user_skill_set]")
    //   .then(profiles => {
    //     res.json({
    //       profiles
    //     });
    //   });
  } catch (error) {
    log.error(`Profile controller[AllProfiles]: Failed to send ${error}`);

    return next(error);
  }
};

// @route POST /api/v2/users/profile/experience
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
    //const profile = await UserExperience.query().findById(req.user.id);
    const profile = await UserExperience.query()
      .debug()
      .findById(req.user.id);
    console.log("profile", profile);

    //Array.isArray(profile) && profile.length == 0;

    if (Array.isArray(profile) && profile.length == 0) {
      return next(
        createError({
          status: CONFLICT,
          message: "No experience profile data found!"
        })
      );
    } else {
      const profileExpCreate = await registerExpProfile(newExp);
      return res.status(200).json({ success: true, profileExpCreate });
    }
  } catch (error) {
    log.error(`Profile controller[createExpProfile]: Failed to send ${error}`);

    return next(error);
  }
};

// @route POST /api/v2/users/profile/education
// @desc  Add profile education
// @access Private
const createEducation = async (req, res, next) => {
  try {
    const {
      school_name,
      degree_name,
      major_fieldofstudy,
      start_date,
      end_date,
      current,
      description
    } = req.body;

    const newEdu = {
      school_name,
      degree_name,
      major_fieldofstudy,
      start_date,
      end_date,
      current,
      description
    };

    const profileEducation = await UserEducation.query().findById(req.user.id);
    if (profileEducation) {
      return next(
        createError({
          status: CONFLICT,
          message: "Already added education profile"
        })
      );
    } else {
      const profileEduCreate = await registerExpProfile(newEdu);
      return res.status(200).json({ success: true, profileEduCreate });
    }
  } catch (error) {
    log.error(`Profile controller[createEducation]: Failed to send ${error}`);

    return next(error);
  }
};

// @route    GET /api/v2/user/profile/current
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

async function registerEduProfile(datus) {
  try {
    const result = await UserEducation.query().insertGraph(datus);

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getTest,
  createProfile,
  getProfile,
  createExpProfile,
  AllProfiles,
  createEducation,
  deleteExp
};
