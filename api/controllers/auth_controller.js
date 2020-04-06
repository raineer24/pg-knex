const User = require("../../models/users");
const Promise = require("bluebird");
const bcrypt = require("bcryptjs");
const log = require("color-logs")(true, true, "User Account");
const error = require("debug")("pg-knex:error");
const { createError, BAD_REQUEST } = require("../../helpers/error_helper");

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

  if (!email || !password)
    next(
      createError({
        status: BAD_REQUEST,
        message: "`username` + `password` are required fields"
      })
    );

  try {
    _findUserByEmail(email)
      .then(data => {
        res.json({ data });
      })
      .catch(Error, err => {
        if (err.message === "User not found") {
          error(err.message);
          log.error(
            `The email address ${email} is not associated with any account.`
          );
          // return res.status(400).json({
          //   errors: [
          //     {
          //       msg: `The email address ${email} is not associated with any account.`
          //     }
          //   ]
          // });
          return Promise.reject(
            new Error(
              `The email address ${email} is not associated with any account.`
            )
          );
        } else {
          return Promise.reject(err);
        }
      })
      .catch(next);

    // if (!isMatch) {
    //   return res.status(400).json({ errors: [{ msg: "Password incorrect" }] });
    // }

    //console.log(user);
  } catch (err) {
    log.error(err.message);
    res.status(500).send(`Server error: ${err.message}`);
  }

  //console.log(user);

  // try {
  //   let user = await _findUserByEmail({ email });
  //   console.log(user);

  //   const isMatch = await bcrypt.compare(password, user.password);

  //   const payload = { id: user.id, email: user.email };
  //   jwt.sign(
  //     payload,
  //     process.env.SECRET_KEY,
  //     { expiresIn: "1h" },
  //     (err, token) => {
  //       if (err) throw err;
  //       log.info(`Logged into user account ${user.email}`);
  //       res.status(200).json({ message: " Auth Successful", token: token });
  //     }
  //   );
  // } catch (err) {
  //   log.error(err.message);
  //   res.status(500).send(`Server error: ${err.message}`);
  // }
  // if (!isMatch) {
  //   return res.status(400).json({ errors: [{ msg: "Password incorrect" }] });
  // }
};

const _findUserByEmail = email =>
  User.query()
    .where("email", email)
    .first()
    .then(user => {
      console.log(user);

      if (!user) {
        return Promise.reject(new Error("User not found"));
      }
      return Promise.resolve(user);
    });

const getCurrent = (req, res, next) => {
  User.query().then(user => {
    res.json({ user });
  });
};

module.exports = { getCurrent, postLogin };
