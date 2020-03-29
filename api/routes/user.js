const express = require("express");
const router = express.Router();
const database = require("../../config/database");
const gravatar = require("gravatar");

router.get("/", (req, res) => {
  res.json({
    message: "Welcome Test Development"
  });
});

router.post("/register", (req, res) => {
  console.log(req.body);

  const avatar = gravat.url(req.body.email, {
    s: "200", // Size
    r: "pg", // Rating
    d: "mm" // Default
  });

  database("users")
    .returning(["id", "first_name", "email", "image_url", "username"])
    .insert({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      first_name: req.body.first_name,
      image_url: req.body.email
    })
    .then(user => {
      return res.status(201).json({ user, success: true, message: "Saved" });
      // console.log(user[0]);
    })
    .catch(err => {
      if (err.routine === "_bt_check_unique") {
        return res
          .status(400)
          .send({ message: "User with that EMAIL already exist" });
      }
      return res.status(400).send(err);
    });
});

module.exports = router;
