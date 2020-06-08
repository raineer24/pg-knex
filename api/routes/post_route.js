const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getTest,
  addPost
} = require("../controllers/post_controller");


router.get("/", getTest);

router.post("/", addPost);

module.exports = router;