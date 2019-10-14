const express = require("express");
const router = express.Router();
const database = require("../../config/database");
const bcrypt = require("bcrypt");
// Registration validation
const checkRegistrationFields = require("../../validation/register");

router.get("/", (req, res, next) => {
  database
    .select()
    .table("users")
    .then(data => res.json(data));
});

router.post("/register", (req, res) => {
  // Ensures that all entries by the user are valid
  //const { errors, isValid } = checkRegistrationFields(req.body);

  //If any of the entries made by the user are invalid, a status 400 is returned with the error
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  database("users")
    .returning(["id", "email", "username"])
    .insert({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      first_name: req.body.first_name,
      image_url: req.body.image_url
    })
    .then(user => {
      // This is where the api returns json to the /register route
      // Return the id, email, registered on date and token here
      // Sending the user's token as a response here is insecure
      res.json({ user, success: true, message: "ok" });
      // console.log(user[0]);
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;
