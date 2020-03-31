const express = require("express");
const router = express.Router();
const database = require("../../config/database");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");

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

// @route    POST api/users
// @desc     Register user
// @access   Public

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

// @route    GET api/users/login
// @desc     Login User / Returning JWT Token
// @access   Public
router.post("/login", (req, res) => {
  database
    .select("id", "email", "password")
    .where("email", "=", req.body.email)
    .from("users")
    .then(data => {
      if (data.length === 0) {
        return res.status(404).json({ email: "User not found" });
      }

      //Check is password
      bcrypt.compare(req.body.password, data[0].password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: data[0].id, email: data[0].email };

          // Sign Token
          jwt.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({ password: "Password incorrect" });
        }
      });
    });
});

module.exports = router;
