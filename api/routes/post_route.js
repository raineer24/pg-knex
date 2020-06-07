const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getTest
} = require("../controllers/post_controller");


router.get("/", getTest);

module.exports = router;