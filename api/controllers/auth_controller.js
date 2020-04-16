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

const createUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    let newUser = await getUserEmail(email);
    console.log("User", newUser);
    if (newUser) {
      let err = new Error("Email aready exists");
      err.status = CONFLICT;

      throw err;
    }
  } catch (error) {
    console.log("auth controller", error);

    return next(error);
  }
  // Promise.resolve()
  //   .then(function() {
  //     throw new Error("BROKEN");
  //   })
  //   .catch(next); // Errors will be passed

  // try {
  //   const user = await createUsers(email);
  //   console.log("user:: ", user);

  //   // if (user === "undefined") {
  //   //   console.log("undefined");
  //   // }

  //   // console.log("typeof:", typeof user);
  // } catch (err) {
  //   //console.log("error::!", err.stack);
  //   return next(err);
  //   // res.status(500).json({ errors: { msg: "email already exist" } });
  // }
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
    //console.log("post register user:", user);

    // if (!user) {
    //   console.log("User with this email does not exist");
    //   let err = new Error("User with this email does not exist");
    //   err.status = 404;
    //   throw err;
    // }

    if (!user)
      return next(
        createError({
          status: CONFLICT,
          message: "User with this email does not exist"
        })
      );

    res.send(user);

    // /* now check password */
    // const isValidPassword = await bcrypter.checkPassword(
    //   password,
    //   user.password
    // );
    // if (!isValidPassword)
    //   return res
    //     .status(400)
    //     .json({ status: false, message: "Password Incorrect" });

    /** create token with some data */
    //const token = await tokenHandler.createToken({ data: user.id });
    // res.json({ status: true, user, token });
  } catch (error) {
    console.log("post signin user:/Error::", error);
    return next(error);
  }
};

// async function createUsers(email) {
//   try {
//     let user = await getUserEmail(email);
//     console.log("user", user);

//     if (user) {
//       let err = new Error("Email aready exists");
//       err.status = CONFLICT;

//       throw err;
//     }

//     //User.query().insertAndFetch({email: req.body.email, password:})

//     // if (user)
//     //   return next(
//     //     createError({
//     //       status: CONFLICT,
//     //       message: "Email already exists"
//     //     })
//     //   );

//     // if (user) res.json({ mesage: "email already exists" });
//     // console.log(user);
//   } catch (err) {
//     throw err;
//   }
// }

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
    throw error;
  }
}

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
    res.json({ user });
  });
};

module.exports = { getCurrent, postLogin, createUser };
