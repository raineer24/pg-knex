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

const multer = require("multer");

const {
  getCurrent,
  postLogin,
  createUser
} = require("../controllers/auth_controller");

const storage = multer.diskStorage({
  filename(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

const imageFilter = (req, file, cb) => {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFilter });

cloudinary.config({
  cloud_name: "dwsbpkgvr",
  api_key: "246382268158277",
  api_secret: "OEJwFk8xMOuNID7Z7L5MNDJ9nY8"
});

router.get("/current", checkAuth, (req, res) => {
  res.json({
    message: "Welcome Test Development"
  });
});

router
  .route("/current1")
  .all(checkAuth)
  .get(getCurrent);

router
  .route("/register")
  .all(fileUpload)
  .post(createUser);

router.route("/login").post(postLogin);

module.exports = router;
