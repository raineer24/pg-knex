const express = require("express");
const router = express.Router();
const database = require("../../config/database");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");

const multer = require("multer");

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

router.get("/", (req, res) => {
  res.json({
    message: "Welcome Test Development"
  });
});

router.post("/register", upload.single("image"), (req, res) => {
  console.log(req.body);
  cloudinary.uploader.upload(req.file.path, result => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        database("users")
          .returning([
            "id",
            "first_name",
            "email",
            "image_url",
            "username",
            "password"
          ])
          .insert({
            email: req.body.email,
            password: hash,
            username: req.body.username,
            first_name: req.body.first_name,
            image_url: result.secure_url
          })
          .then(user => {
            return res
              .status(201)
              .json({ user, success: true, message: "Saved" });
            // console.log(user[0]);
          })
          .catch(err => {
            console.log(err);
            if (err.routine === "_bt_check_unique") {
              return res
                .status(400)
                .send({ message: "User with that EMAIL already exist" });
            }
            return res.status(400).send(err);
          });
      });
    });
  });
});

module.exports = router;
