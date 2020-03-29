const express = require("express");
const router = express.Router();
const database = require("../../config/database");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.json({
    message: "Welcome Test Development"
  });
});

router.post("/register", (req, res) => {
  console.log(req.body);

  const image_url = gravatar.url(req.body.email, {
    s: "200", // Size
    r: "pg", // Rating
    d: "mm" // Default
  });

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
          image_url
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

module.exports = router;
