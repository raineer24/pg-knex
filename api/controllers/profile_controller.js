const UserProfile = require("../../models/user_profile");
const User = require("../../models/users");
const UserSkillSet = require("../../models/user_skill_set");
const UserExperience = require("../../models/user_exp");
const UserEducation = require("../../models/user_edu");
const passport = require("passport");
const log = require("color-logs")(true, true, "User Profile");
const axios = require('axios');
const config = require('config');
const {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} = require("../../helpers/error_helper");

const getTest = (req, res, next) => {
  console.log('error');

  res.json({
    msg: "Profile works"
  });
};

// @route    GET /api/v2/users/profile/:id
// @desc     Get user profile :id
// @access   Private
const getId = async (req, res, next) => {
  try {
    const user = await UserProfile.query().findById(req.params.id).eager("user_skill_set").then(data => {
      console.log('USER DATA:', data)
    })
    // .debug(true);
    console.log('USER: ', user);

    return res.status(200).json({
      success: true,
      user
    });


  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      msg: 'No User profile found'
    });
  }
};

// @route    GET /api/v2/users/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
const getRepo = async (req, res, next) => {
  try {
    const uri = encodeURI(`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`);
    const headers = {
      'user-great': 'node.js',
      Authorization: `token ${config.get('githubToken')}`
    };

    const gitHubResponse = await axios.get(uri, {
      headers
    });
    return res.json(gitHubResponse.data);


  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      msg: 'No Github profile found'
    });
  }
};

// @route    DELETE /api/v2/users/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
const deleteEducation = async (req, res, next) => {


  try {
    // const user = await User.query().findById(req.params.edu_id);
    // const userEducation = await user.$relatedQuery('user_education').debug(true);
    // const userEduLength = Object.keys(userEducation).length;
    const user = await UserEducation.query().where('user_education_detail_id', req.params.edu_id).debug(true);
   if(user.length === 0) {
    return next(
        createError({
          status: CONFLICT,
          message: "No User Experience profile data found! You might want to add user profile experience data"
        })
      );
  } else {
    
  const userEdu = await UserEducation.query().where('user_education_detail_id', req.params.edu_id).delete().returning('*');
     return res.status(200).json({
      success: true,
      msg: 'User Profile Experience Deleted',
      userEdu
    });
  }


  } catch (error) {
    log.error(`Profile controller[DeleteUserEducation]: Failed to send ${error}`);

    return next(error);
  }
}


// @route    DELETE api/v2/users/profile
// @desc     Delete profile, user 
// @access   Private
const deleteProfile = async (req, res, next) => {

  try {
    const userProfile = await User.query().findById(req.user.id).debug(true);
    console.log('userProfile', userProfile);

    if (userProfile) {

      const userSkill = await userProfile
        .$relatedQuery('user_skill').delete();
      console.log('userSkill', userSkill);


      const userP = await userProfile
        .$relatedQuery('user_profile').delete();

      await userProfile.$query().delete().debug(true);


      return res.status(200).json({
        success: true,
        msg: 'User Deleted'
      });

      //res.json({ msg: 'User deleted' });

    }
  } catch (error) {
    log.error(`Profile controller[DeleteUserProfile]: Failed to send ${error}`);

    return next(error);
  }

}

// @route    DELETE /api/v2/users/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
const deleteExp = async (req, res, next) => {
  try {
    const user = await User.query().findById(req.params.exp_id).debug(true);

    const userExp = await user.$relatedQuery('user_experience').delete();
    console.log('userExp: ', userExp);

    return res.status(200).json({
      success: true,
      msg: 'User Profile Experience Deleted'
    });

  } catch (error) {
    log.error(`Profile controller[DeleteExpProfile]: Failed to send ${error}`);

    return next(error);
  }
};

//@route GET /api/v2/users/profile/getProfiles
// @desc     Get all profiles
// @access   Public
const AllProfiles = async (req, res, next) => {
  try {
    UserProfile.query()
      .eager("[user_experience,user_skill_set,user_education]")
      .then(profiles => {
        res.json({
          profiles
        });
      });
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
    users_id: req.user.id,
    job_title,
    company_name,
    job_location,
    start_date,
    end_date,
    current,
    description
  };

  try {

    const users = await User.query().findById(req.user.id).select('id').eager('user_experience').then(data => {
      let user_exp = data.user_experience;

      return user_exp;

    });
    const usersLength = Object.keys(users).length //0

    const userProfile = await User.query().findById(req.user.id).eager('user_profile').then(data => {
      return data.user_profile;

    });

    const usersProfileLength = Object.keys(userProfile).length //0

    console.log('usersprofilelength: ', usersProfileLength);

      const profileExpCreate = await registerExpProfile(newExp);
      return res.status(200).json({
        success: true,
        profileExpCreate
      });

    
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
      users_id: req.user.id,
      school_name,
      degree_name,
      major_fieldofstudy,
      start_date,
      end_date,
      current,
      description
    };

    const profileEducation = await User.query().findById(req.user.id).eager('user_education').then(data => {
      return data.user_education;
    });
    console.log('profileEdu', profileEducation);

    const usersEduLength = Object.keys(profileEducation).length //0
    console.log('usersEduLength', usersEduLength);


   
    
      const profileEduCreate = await registerEduProfile(newEdu);
      return res.status(200).json({
        success: true,
        profileEduCreate
      });
  
  } catch (error) {
    log.error(`Profile controller[createEducation]: Failed to send ${error}`);

    return next(error);
  }
};

// @route    GET /api/v2/users/profile/current
// @desc     Get current user's profile
// @access   Private
const getProfile = async (req, res, next) => {
  try {

    const userprofile = await UserProfile.query().where('users_id', req.user.id).eager("[user_experience,user_skill_set,user_education]");
    console.log('userprofile', userprofile);
    return res.status(200).json({
      success: true,
      userprofile
    });


  } catch (error) {
    log.error(`Profile controller[Get Current Profile]: Failed to send ${error}`);

    return next(error);
  }
};

// @route  Put /api/v2/users/profile
// @desc   Edit user profile
// @access Private - use jwt strategy to authenticate
const updateProfile = async (req, res, next) => {
  // Get all fields needed for a user profile

  //Check for other form data

  let areaExpertise = req.body.areas_of_expertise;

  console.log('req.user.id ', req.user.id);
  console.log('req.params.id ', req.params.id);

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

  // try {
  //   const data = {

  //     //  users_id: req.params.id,
  //     company_name,
  //     website,
  //     job_location,
  //     status,
  //     bio,
  //     youtube_handle,
  //     twitter_handle,
  //     facebook_handle,
  //     instagram_handle,
  //     user_skill_set: [{
  //       users_id: req.user.id,
  //       skill_set_name: skill_set_name
  //     }]
  //   };

  //   const profileUpdate = await updateUserProfile(data);
  //   return res.status(200).json({
  //     success: true,
  //     profileUpdate
  //   });
  // } catch (error) {
  //   log.error(`Profile controller[update PROFILE]: Failed to send ${error}`);
  // }

  // const data = {
  //   //  users_id: req.params.id,
  //   company_name,
  //   website,
  //   job_location,
  //   status,
  //   bio,
  //   youtube_handle,
  //   twitter_handle,
  //   facebook_handle,
  //   instagram_handle,
  //   user_skill_set: [{
  //     users_id: req.user.id,
  //     skill_set_name: skill_set_name
  //   }]
  // };

  // const something = await SomeModel
  //   .query()
  //   .findById('some-id')
  //   .joinEager('someRelation');

  //await something.$query().patch(obj)


  try {
    const userprofile = await UserProfile.query().where('users_id', req.params.id).then(data => {
      console.log('data', data[0].id);
      return data[0].id
    });
    const data = {
      id: userprofile,
      //  users_id: req.params.id,
      company_name,
      website,
      job_location,
      status,
      bio,
      youtube_handle,
      twitter_handle,
      facebook_handle,
      instagram_handle,
      user_skill_set: [{
        user_skill_set_id: userprofile,
        users_id: req.user.id,
        skill_set_name: skill_set_name
      }]
    };
    //const user = await User.query().findById(req.params.id).joinEager('[user_profile, user_skill]');
    //const user = await UserProfile.query().findById(req.params.id).joinEager('user_skill_set');
    // await user.$query().patch({
    //   user_profile: data
    // }).returning('*').debug();

    // const userp = await updateUserProfile({
    //   user_profile: data
    // }).debug();

    // const userp = await updateUserProfile({
    //   id: 1,
    //   users_id: req.params.id,

    //   movies: [{
    //       id: 1,
    //       edition: "first"
    //     },
    //     {
    //       id: 1,
    //       edition: "second"
    //     }
    //   ]
    // });


    // console.log('userprofile', userprofile);

    userp = await UserProfile.query().upsertGraph(data);
    console.log('USER: ', userp);
    return res.status(200).json({
      success: true,
      userp
    });
  } catch (error) {
    log.error(`Profile controller[update PROFILE]: Failed to send ${error}`);
  }




  // //const user = await UserProfile.query().findById(req.params.id).debug(true);
  // // const user = await UserProfile.query().where('users_id', req.params.id).debug(true);

  // const updated_user = await UserProfile.query().skipUndefined().update(data).where("users_id", req.params.id).returning('*').debug(true).then(data => {
  //   console.log("data: ", data);
  //   return data;
  // });

  // const updated_user = await UserProfile.query().skipUndefined().where("users_id", req.params.id)

  //console.log('user:', user);
  // console.log('updated user :', updated_user);
  //const user = await UserProfile.query().findById(req.params.id);
  //const userSkill = await user.$relatedQuery('user_skill_set').debug(true);

  // const profile = await UserProfile.query().findById(req.user.id);
  //console.log('profile:', userSkill);



  // return res.status(200).json({
  //   success: true,
  //   updated_user
  // });

};

// @route  POST /api/v2/users/profile
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
      user_skill_set: [{
        users_id: req.user.id,
        skill_set_name: skill_set_name
      }]
    };





    const profile = await UserProfile.query().findById(req.user.id);
    console.log('profile:', profile);
    const profileCreate = await registerProfile(data);
    return res.status(200).json({
      success: true,
      profileCreate
    });

  } catch (error) {
    log.error(`Profile controller[CREATEProfile]: Failed to send ${error}`);
    if (error.code === "23505") {
      return next(
        createError({
          status: CONFLICT,
          message: "Already ADDED profile"
        })
      );
    }

    return next(error);
  }
};

async function updateUserProfile({
  datus
}) {
  try {
    const result = await UserProfile.query().upsertGraph({
      datus
    }).debug();

    return result;
  } catch (error) {
    throw error;
  }
}

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
  deleteExp,
  deleteProfile,
  deleteEducation,
  getRepo,
  updateProfile,
  getId
};