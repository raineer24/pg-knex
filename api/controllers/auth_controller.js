const User = require("../../models/users");
const Promise = require("bluebird");
const bcrypt = require("bcryptjs");
const log = require("color-logs")(true, true, "User Account");

//const postLogin = ()

const postLogin = (req, res, next) => {};

const _findUserByEmail = email => {
  User.query()
    .where("email", req.body.email)
    .first()
    .then(user => {
      console.log(`user!: `, user);

      if (!user) {
        return Promise.reject(new Error("User not found"));
      }
      return Promise.resolve(user);
    });
};

const getCurrent = (req, res, next) => {
  res
    .json({
      message: "Welcome Test Development"
    })
    .catch(next);
};

module.exports = { getCurrent };
