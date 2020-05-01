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
const { validationResult } = require("express-validator");

cloudinary.config({
  cloud_name: "dwsbpkgvr",
  api_key: "246382268158277",
  api_secret: "OEJwFk8xMOuNID7Z7L5MNDJ9nY8"
});

// Load Input Validation
const expressTest = require("../../validation/express-register");

const createUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!req.file) {
    //let error = new Error("Please select an image to upload");
    // error.status = CONFLICT;
    // throw error;
    return next(
      createError({
        status: CONFLICT,
        message: "Please select an image to upload"
      })
    );
  }

  // //console.log("test: ", test);

  // console.log("email", email);

  try {
    let newUser = await getUserEmail(email);

    if (newUser)
      return next(
        createError({
          status: CONFLICT,
          message: "Email already exist"
        })
      );

    console.log("newUser", newUser);

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

    console.log("data", data);

    const signup = await registerUser(data);
    //console.log("signup", signup);

    return res.status(201).json({
      status: true,
      data: signup
    });

    //console.log("hashPassword: ", hashPassword);
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

    // if (!user) {
    //   //let err = new Error("User with this email does not exist");
    //   errors.email = "User with this email does not exist!";
    //   errors.status = CONFLICT;
    //   throw errors;
    // }

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
    const token = await tokenHandler.createToken({ ...user });
    res.json({ status: true, user, token });
  } catch (error) {
    log.error(`Authcontroller[createUser]: Failed to send ${error}`);
    return next(error);
  }
};

// function getUserEmail(email) {
//   return new Promise((resolve, reject) => {
//     User.query()
//       .where("email", email)
//       .then(result => {
//         const row = result[0];
//         //console.log(row);

//         // if (!row) {
//         //   const error = new Error("email not found");

//         //   reject(error);
//         //   return;
//         // }
//         resolve(row);
//       })
//       .catch(reject);
//   });
// }

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

// async function uploadCloudinary(image) {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload(image, (err, url) => {
//         if (err) return reject(err);
//         console.log("url", url);

//         return resolve(url);
//       })
//       .catch(reject);
//   });
// }

// function getUserEmail(email) {
//   return new Promise((resolve, reject) => {
//     User.query()
//       .where("email", email)
//       .then(result => {
//         const row = result[0];
//         console.log(row);

//         if (!row) {
//           reject("email not found");
//           return;
//         }
//         resolve(row);
//       })
//       .catch(reject);
//   });
// }

const getCurrent = (req, res, next) => {
  User.query().then(user => {
    res.json({
      id: req.user.id,
      first_name: req.user.first_name,
      email: req.user.email
    });
  });
};

module.exports = { getCurrent, postLogin, createUser };
