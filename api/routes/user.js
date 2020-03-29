const express = require("express");
const router = express.Router();
const database = require("../../config/database");

router.get("/", (req, res) => {
  res.json({
    message: "Welcome Test Development"
  });
});

router.post("/register", (req, res) => {
  console.log(req.body);

  database("users")
    .returning(["id", "first_name", "email", "image_url", "username"])
    .insert({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      token: "token",
      first_name: req.body.first_name,
      image_url: req.body.email,
      emailverified: "f",
      tokenusedbefore: "f"
    })
    .then(user => {
      // This is where the api returns json to the /register route
      // Return the id, email, registered on date and token here
      // Sending the user's token as a response here is insecure
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
