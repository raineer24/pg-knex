const User = require("../../models/users");
const Promise = require("bluebird");
const bcrypt = require("bcryptjs");
const log = require("color-logs")(true, true, "User Account");
const error = require("debug")("pg-knex:error");
const asyncWrapper = require("../../middleware/asyncWrapper");
const handler = require("../../utils/responseHandler");
const tokenHandler = require("../../utils/tokenHelper");
const bcrypter = require("../../utils/bcrypter");

const {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} = require("../../helpers/error_helper");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dwsbpkgvr",
  api_key: "246382268158277",
  api_secret: "OEJwFk8xMOuNID7Z7L5MNDJ9nY8"
});



// @route    GET api/v2/users/:id
// @desc     Get users by ID
// @access   Private
const getUsersId = async (req, res, next) => {
  try {
    const user = await User.query().findById(req.params.id).eager("[user_profile,user_experience, user_skill,user_education]")
      .debug()
      .then(data => {
        //console.log("data: ", data);
        //return data.user_skill;
        // skill = data.user_skill;
        // if (Array.isArray(skill)) {
        //   console.log("array!");
        // }
        // skill.forEach(function(item) {
        //   console.log(item.skill_set_name);
        // });
        return data;
      });

    if (!user) {
      return next(
        createError({
          status: CONFLICT,
          message: "No User found!"
        })
      );
    }
    return res.status(200).json({
      success: true,
      user
    });



  } catch (error) {
    log.error(`Auth controller[Get User by Id]: Failed to send ${error}`);

    return next(error);
  }
}

// @route GET api/users/register
// @desc Register a user
// @access Public
const createUser = async (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  if (!req.file) {
    return next(
      createError({
        status: CONFLICT,
        message: "Please select an image to upload"
      })
    );
  }

  try {
    let newUser = await getUserEmail(email);

    if (newUser)
      return next(
        createError({
          status: CONFLICT,
          message: "Email already exist"
        })
      );

    console.log('new user', newUser);


    const hashPassword = await bcrypter.encryptPassword(password);

    let url = await uploadToCloudinary(req.file.path);
    const image_link = url.secure_url;

    const data = {
      username: req.body.username,
      password: hashPassword,
      email: email,
      image_url: image_link,
      first_name: req.body.first_name
    };

    const signup = await registerUser(data);

    return res.status(201).json({
      status: true,
      data: signup
    });
  } catch (error) {
    log.error(`Authcontroller[createUser]: Failed to send ${error}`);

    return next(error);
  }
};

/**
 * Signin
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
const postLogin = async (req, res, next) => {
  const email = String(req.body.email);
  const password = String(req.body.password);

  try {
    const user = await getUserEmail(email);

    console.log("newuser: ", user);

    if (!user)
      return next(
        createError({
          status: CONFLICT,
          message: "User with this email does not exist"
        })
      );

    /* now check password */
    const isValidPassword = await bcrypter.checkPassword(
      password,
      user.password
    );
    if (!isValidPassword)
      return next(
        createError({
          status: CONFLICT,
          message: "Password Incorrect"
        })
      );

    /** create token with some data */
    const token = await tokenHandler.createToken({
      ...user
    });
    res.json({
      status: true,
      user,
      token
    });
  } catch (error) {
    log.error(`Authcontroller[createUser]: Failed to send ${error}`);
    return next(error);
  }
};

async function getUserEmail(email) {
  try {
    const result = await User.query().where("email", email);
    return result[0] || false;
  } catch (error) {
    console.log("error: ", error);

    throw error;
  }
}

async function registerUser(datus) {
  try {
    const result = await User.query().insertAndFetch(datus);
    return result;
  } catch (error) {
    throw error;
  }
}

function uploadToCloudinary(image) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, (err, url) => {
      if (err) return reject(err);
      return resolve(url);
    });
  });
}

// @route    GET api/v2/users
// @desc     Get all users
// @access   Public
const getUsers = async (req, res, next) => {
  const user = await User.query()
    .eager("[user_profile,user_experience, user_skill,user_education]")
    .debug()
    .then(data => {
      //console.log("data: ", data);
      //return data.user_skill;
      // skill = data.user_skill;
      // if (Array.isArray(skill)) {
      //   console.log("array!");
      // }
      // skill.forEach(function(item) {
      //   console.log(item.skill_set_name);
      // });
      return data;
    });
  // const users = await User.query().eager("[user_profile,user_experience]");
  // console.log("usrs", users);
  res.status(200).json({
    status: true,
    user
  });
  //return res.status(200).json({ success: true, profileExpCreate });
};

module.exports = {
  getUsers,
  postLogin,
  createUser,
  getUsersId
};