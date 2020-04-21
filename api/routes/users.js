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

const multer = require("multer");

const cloudinary = require("cloudinary");

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

require("dotenv").config();

let that;

router.get("/", (req, res, next) => {
  database
    .select()
    .table("users")
    .then(data => res.json(data));
});

router.post("/register", upload.single("image"), (req, res) => {
  that = this;

  // Ensures that all entries by the user are valid
  const { errors, isValid } = checkRegistrationFields(req.body);

  // If any of the entries made by the user are invalid, a status 400 is returned with the error
  if (!isValid) {
    return res.status(400).json(errors);
  }
  cloudinary.uploader.upload(req.file.path, result => {
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
          .returning(["id", "email", "username", "token", "first_name"])
          .insert({
            email: req.body.email,
            password: hash,
            username: req.body.username,
            token: token,
            first_name: req.body.first_name,
            image_url: result.secure_url,
            emailverified: "f",
            tokenusedbefore: "f"
          })
          .then(user => {
            console.log("user[0]", user[0]);
            console.log(user.token);

            //const hostname = JSON.stringify(config.env.port).replace(/"/g, "");

            // const hostname =
            //   config.env.hostname === "localhost"
            //     ? `${config.env.hostname}:${config.env.port}`
            //     : config.env.hostname;

            // const cfg =
            //   `http://localhost:${hostname}/api/v2/users/verify/` + user[0].token;

            //const cfg = `http://localhost:4200/#/users/verify/` + user[0].token;

            //const cfg = `http://localhost:4200/#/users/verify/`;

            //const cfg = `http://${hostname}/#/users/verify/?token=${user[0].token}`;

            const cfg = `http://localhost:4200/#/users/verify/?token=${user[0].token}`;

            console.log(cfg);

            let username = JSON.stringify(user[0].first_name);
            console.log(username);

            let newTemp = username.replace(/"/g, "");

            const body = `<table><div><p>Hi, ${newTemp}</p></div>
          <div><p><a href="${cfg}">Registration Link</p></div></table>`;

            const mailOptions = {
              from: '"Example Team" <delaritaraineer81@gmail.com>',
              to: "delaritaraineer81@gmail.com, delaritaraineer81@gmail.com",
              subject: "Rain - Successful registration Encrypt  v2",
              text: "Hey there, it’s our first message sent with Nodemailer ",
              html: body
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
});

//

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
            res.status(400).json("incorrect password");
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
  console.log(typeof req.params);

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

// remove user :id
router.delete("/:id", (req, res) => {
  console.log(req.params);

  database("users")
    .where({ id: req.params.id })
    .del()
    .then(result => {
      res.status(201).json({
        message: "User Deleted"
      });
    });
});

//get user :id
router.get("/:id", (req, res) => {
  database("users")
    .where({ id: req.params.id })
    .select()
    .then(data => {
      res.status(201).json({
        data
      });
    });
});

// user backup

// @route    GET api/users/login
// @desc     Login User / Returning JWT Token
// @access   Public
router.post("/logins", (req, res) => {
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
