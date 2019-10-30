const express = require("express");
const router = express.Router();
const database = require("../../config/database");
const bcrypt = require("bcrypt");
// Registration validation
const checkRegistrationFields = require("../../validation/register");
// Login validation
const validateLoginInput = require("../../validation/login");
const jwt = require("jsonwebtoken");
// Secret key
const key = require("../../utilities/keys");

const crypto = require("crypto");

require("dotenv").config();

router.get("/", (req, res, next) => {
  database
    .select()
    .table("users")
    .then(data => res.json(data));
});

router.post("/register", (req, res) => {
  // Ensures that all entries by the user are valid
  const { errors, isValid } = checkRegistrationFields(req.body);

  // If any of the entries made by the user are invalid, a status 400 is returned with the error
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //If any of the entries made by the user are invalid, a status 400 is returned with the error
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let token;
  crypto.randomBytes(48, (err, buf) => {
    if (err) throw err;
    token = buf
      .toString("base64")
      .replace(/\//g, "") // Because '/' and '+' aren't valid in URLs
      .replace(/\+/g, "-");
    return token;
  });

  bcrypt.genSalt(12, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
      database("users")
        .returning(["id", "email", "username"])
        .insert({
          email: req.body.email,
          password: hash,
          username: req.body.username,
          token: token,
          first_name: req.body.first_name,
          image_url: req.body.image_url
        })
        .then(user => {
          console.log(user.rows);

          // This is where the api returns json to the /register route
          // Return the id, email, registered on date and token here
          // Sending the user's token as a response here is insecure
          res.json({ user, success: true, message: "ok" });
          // console.log(user[0]);
        })
        .catch(err => {
          errors.account = "Email already registered";
          res.status(400).json(errors);
        });
    });
  });
});

//login route
router.post("/login", (req, res) => {
  // Ensures that all entries by the user are valid
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    database
      .select("id", "email", "password")
      .where("email", "=", req.body.email)
      .from("users")
      .then(data => {
        bcrypt.compare(req.body.password, data[0].password).then(isMatch => {
          if (isMatch) {
            const payload = { id: data[0].id, email: data[0].email };
            jwt.sign(
              payload,
              process.env.SECRET_KEY,
              { expiresIn: "1h" },
              (err, token) => {
                res.status(200).json("Bearer " + token);
              }
            );
          } else {
            res.status(400).json("Bad Request");
          }
        });
      })
      .catch(err => {
        res.status(400).json("Bad Request");
      });
  }
});
module.exports = router;
