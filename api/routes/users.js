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
  const { errors, isValid } = checkRegistrationFields(req.body);

  //If any of the entries made by the user are invalid, a status 400 is returned with the error
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log(res);
  // database("users").select('email')
  //     .from('users')
  //     where('email', req.body.email)
  //     .then(email_list => {
  //       if (email_list.length === 0) {
  //         return database('users')
  //           .returning(["id", "email", "username"])
  //         .insert({
  //           email: req.body.email,
  //           password: req.body.password,
  //           username: req.body.username,
  //           first_name: req.body.first_name,
  //           image_url: req.body.image_url
  //         })
  //         .then(newUserId => {
  //           console.log('inserted user', newUserId);

  //         });
  //         console.log('not inserting user');
  //         return

  //       }
  //     }
  database("users")
    .select("username")
    .from("users")
    .where("username", req.body.username)
    .andWhere("email", req.body.email)
    .then(userNameList => {
      if (userNameList.length === 0) {
        return database("users")
          .returning("id")
          .insert([
            {
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
              first_name: req.body.first_name,
              image_url: req.body.image_url
            }
          ])
          .then(newUserId => {
            console.log("inserted user", newUserId);
          });
      }
      console.log("not inserting user");
      return;
    });

  // database("users")
  //   .returning(["id", "email", "username"])
  //   .insert({
  //     email: req.body.email,
  //     password: req.body.password,
  //     username: req.body.username,
  //     first_name: req.body.first_name,
  //     image_url: req.body.image_url
  //   })
  //   .then(user => {
  //     console.log(user.rows);

  //     // This is where the api returns json to the /register route
  //     // Return the id, email, registered on date and token here
  //     // Sending the user's token as a response here is insecure
  //     res.json({ user, success: true, message: "ok" });
  //     // console.log(user[0]);
  //   })
  //   .catch(err => {
  //     errors.account = "Email already registered";
  //     res.status(400).json(errors);
  //   });
});
module.exports = router;
