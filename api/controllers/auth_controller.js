const User = require("../../models/users");
const Promise = require("bluebird");
const bcrypt = require("bcryptjs");
const log = require("color-logs")(true, true, "User Account");
const error = require("debug")("pg-knex:error");
const {
  createError,
  BAD_REQUEST,
  GENERIC_ERROR
} = require("../../helpers/error_helper");

/**
 * Signin
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
const postLogin = async (req, res, next) => {
  const email = String(req.body.email);
  const password = String(req.body.password);
  console.log(req.body);

  try {
    if (!email || !password) {
      let err = new Error("`username` + `password` are required fields");
      err.context = req.body.email;
      err.status = BAD_REQUEST;
      throw err;
    }

    // if (!email || !password)
    //   next(
    //     createError({
    //       status: BAD_REQUEST,
    //       message: "`username` + `password` are required fields"
    //     })
    //   );

    let rows = await _findUserByEmail(email);
    console.log("user", rows);
    // const dbresponse = rows[0];
    // console.log("dbresponse", dbresponse);
    // if (!dbresponse) {
    //   let err = new Error("Error creating user");
    //   err.context = req.body.email;
    //   err.status = BAD_REQUEST;
    //   throw err;
    // }
  } catch (err) {
    return next(err);
  }
};

// throwError = (code, errorType, errorMessage) => error => {
//   if (!error) error = new Error(errorMessage || "Default Error");
//   error.code = code;
//   error.errorType = errorType;
//   throw error;
// };

const _findUserByEmail = email =>
  User.query()
    .where("email", email)
    .then(data => {
      return data[0];
    });

// .then(user => {
//   console.log("iser", user);

//   return Promise.resolve(user);
// });

const getCurrent = (req, res, next) => {
  User.query().then(user => {
    res.json({ user });
  });
};

module.exports = { getCurrent, postLogin };
