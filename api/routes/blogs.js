const express = require("express");
const router = express.Router();
const database = require("../../config/database");
const bcrypt = require("bcrypt");
// Registration validation
const checkRegistrationFields = require("../../validation/register");
const checkAuth = require("../../middleware/check-auth");

router.get("/", (req, res, next) => {
  database
    .select()
    .table("blogs")
    .then(data => res.json(data));
});

router.post("/", (req, res) => {
  //const { errors, isValid } = checkRegistrationFields(req.body);
  console.log(req.body.title);

  database("blogs")
    .returning(["blog_id", "title", "content"])
    .insert({
      title: req.body.title,
      content: req.body.content,
      image_url: req.body.image_url
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
