const express = require("express");
const router = express.Router();
const database = require("../../config/database");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../middleware/check-auth");

const User = require("../../models/users");
const log = require("color-logs")(true, true, "User Account");

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

router.get("/current", checkAuth, (req, res) => {
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
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const existingUser = await User.query()
      .select("id", "email", "password")
      .where("email", "=", req.body.email);

    console.log(existingUser);

    if (!existingUser) {
      return res.status(400).json({ errors: [{ msg: "User not found!" }] });
    }
    const isMatch = await bcrypt.compare(
      req.body.password,
      existingUser[0].password
    );
    console.log("ismatch", isMatch);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Password incorrect" }] });
    }

    const payload = { id: existingUser[0].id, email: existingUser[0].email };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        log.info(`Logged into user account ${existingUser[0].email}`);
        res.status(200).json({ message: " Auth Successful", token: token });
      }
    );
  } catch (err) {
    log.error(err.message);
    res.status(500).send(`Server error: ${err.message}`);
  }
});

module.exports = router;
