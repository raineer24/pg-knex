const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getTest,
  addPost,
  getAllPosts,
  getPostId
} = require("../controllers/post_controller");


// @route    GET api/v2/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', getPostId);


//router.get("/", getTest);


// @route    POST api/v2/posts
// @desc     Create a post
// @access   Private
router.post("/", passport.authenticate("jwt", { session: false }),addPost);

// @route    GET api/v2/posts
// @desc     Get all posts
// @access   Private
router.get("/", passport.authenticate("jwt", { session: false }),getAllPosts);

module.exports = router;