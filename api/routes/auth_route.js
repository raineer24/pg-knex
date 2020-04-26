const express = require("express");
const router = express.Router();
const database = require("../../config/database");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../middleware/check-auth");
const error = require("debug")("pg-knex:error");
const asyncWrapper = require("../../middleware/asyncWrapper");
const Promise = require("bluebird");
const fileUpload = require("../../middleware/image");

const User = require("../../models/users");
const log = require("color-logs")(true, true, "User Account");

const passport = require("passport");

const validateUser = require("../../validation/express-register");

const {
  getCurrent,
  postLogin,
  createUser
} = require("../controllers/auth_controller");

// router.get("/current", checkAuth, (req, res) => {
//   res.json({
//     message: "Welcome Test Development"
//   });
// });

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router
  .route("/current")
  .all(passport.authenticate("jwt", { session: false }))
  .get(getCurrent);

// router
//   .route("/register")
//   .all(fileUpload)
//   .post(createUser);

router.post("/register", fileUpload, createUser);

//router.route("/login").post(postLogin);

router.post("/login", postLogin);

module.exports = router;
