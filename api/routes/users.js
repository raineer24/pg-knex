const express = require("express");
const router = express.Router();
const database = require("../../config/database");
const bcrypt = require("bcrypt");
// Registration validation
const checkRegistrationFields = require("../../validation/register");
// Login validation
const validateLoginInput = require("../../validation/login");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const crypto = require("crypto");

const User = require("../../models/users");

const Mailer = require("../../service/mail");

require("dotenv").config();

let that;

router.get("/", (req, res, next) => {
  database
    .select()
    .table("users")
    .then(data => res.json(data));
});

router.post("/register", (req, res) => {
  that = this;

  // Ensures that all entries by the user are valid
  const { errors, isValid } = checkRegistrationFields(req.body);

  // If any of the entries made by the user are invalid, a status 400 is returned with the error
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
          image_url: req.body.image_url,
          emailverified: "f",
          tokenusedbefore: "f"
        })
        .then(user => {
          console.log("user[0]", user[0]);

          const mailOptions = {
            from: '"Example Team" <delaritaraineer81@gmail.com>',
            to: "delaritaraineer81@gmail.com, delaritaraineer81@gmail.com",
            subject: "Nice Nodemailer test",
            text: "Hey there, it’s our first message sent with Nodemailer ",
            html: `<b>Hello world?</b>${JSON.stringify(user[0])}`
          };

          new Mailer(mailOptions)
            .send()
            .then(() => {})
            .catch(err => {
              console.log(err);

              console.log("failed to send");
            });

          // This is where the api returns json to the /register route
          // Return the id, email, registered on date and token here
          // Sending the user's token as a response here is insecure
          res.json({ user, success: true, message: "ok" });
          // console.log(user[0]);
        })
        .catch(err => {
          console.log(err);

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
      .andWhere("emailverified", true)
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
                res
                  .status(200)
                  .json({ message: " Auth Successful", token: token });
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

router.post("/verify/:token", (req, res) => {
  const { token } = req.params;
  const errors = {};

  database
    .returning(["email", "emailverified", "tokenusedbefore"])
    .from("users")
    .where({ token: token, tokenusedbefore: "f" })
    .update({ emailverified: "t", tokenusedbefore: "t" })
    .then(data => {
      console.log(data.length);
      console.log(data);

      if (data.length > 0) {
        // Return an email verified message
        res.json("Email verified! Please login to access your account");
      } else {
        database
          .select("email", "emailverified", "tokenusedbefore")
          .from("users")
          .where("token", token)
          .then(check => {
            console.log("check", check);
            if (check.length > 0) {
              console.log("check length is 0");
            }
          });
      }
    });
});
module.exports = router;
