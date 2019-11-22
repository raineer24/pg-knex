const express = require("express");
const router = express.Router();
const database = require("../../config/database");
const bcrypt = require("bcrypt");
// Registration validation
const checkRegistrationFields = require("../../validation/register");
const checkAuth = require("../../middleware/check-auth");

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

router.get("/", (req, res, next) => {
  database
    .select()
    .table("blogs")
    .then(data => res.json(data));
});

router.post("/", upload.single("image"), (req, res) => {
  //const { errors, isValid } = checkRegistrationFields(req.body);
  console.log(req.body.title);

  cloudinary.uploader.upload(req.file.path, result => {
    database("blogs")
      .returning(["blog_id", "title", "content"])
      .insert({
        title: req.body.title,
        content: req.body.content,
        image_url: result.secure_url
      })
      .then(blogs => {
        // This is where the api returns json to the /register route
        // Return the id, email, registered on date and token here
        // Sending the user's token as a response here is insecure
        res.json({ blogs, success: true, message: "ok" });
        // console.log(user[0]);
      })
      .catch(err => {
        //errors.account = "Email already registered";
        res.status(400).json(err);
      });
  });
});

// remove blog id
router.delete("/:id", (req, res) => {
  console.log(req.params);

  database("blogs")
    .where({ blog_id: req.params.id })
    .del()
    .then(result => {
      console.log(result);
    });
});

router.get("/:id", (req, res) => {
  database("blogs")
    .where({ blog_id: req.params.id })
    .select()
    .then(data => {
      res.send(data);
    });
});

module.exports = router;
