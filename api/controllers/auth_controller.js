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
const asyncWrapper = require("../../middleware/asyncWrapper");
const handler = require("../../utils/responseHandler");
const tokenHandler = require("../../utils/tokenHelper");
const bcrypter = require("../../utils/bcrypter");

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

  const isEmpty = input => {
    if (input === undefined || input === "") {
      return true;
    }
    if (input.replace(/\s/g, "").length) {
      return false;
    }
    return true;
  };

  if (isEmpty(email) || isEmpty(password)) {
    return handler.errorMessage(res, "lol, wtf");
  }

  try {
    const user = await getUserEmail(email);
    //console.log("yser", userEmail);

    /* now check password */
    const isValidPassword = await bcrypter.checkPassword(
      password,
      user.password
    );
    if (!isValidPassword)
      return res
        .status(400)
        .json({ status: false, message: "Password Incorrect" });

    /** create token with some data */
    const token = await tokenHandler.createToken({ data: user.id });
    res.json({ status: true, user, token });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ errors: error });
  }
};

const createUser = async (req, res, next) => {};

function getUserEmail(email) {
  return new Promise((resolve, reject) => {
    User.query()
      .where("email", email)
      .then(result => {
        const row = result[0];
        if (!row) {
          reject("email not found");
          return;
        }
        resolve(row);
      })
      .catch(reject);
  });
}

const getCurrent = (req, res, next) => {
  User.query().then(user => {
    res.json({ user });
  });
};

module.exports = { getCurrent, postLogin, createUser };
