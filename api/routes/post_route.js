const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getTest,
  addPost,
  getAllPosts,
  getPostId,
  deletePost,
  likePost,
  unlikePost,
  postComment
} = require("../controllers/post_controller");

const {
  userPostValidationRules,
  validate
} = require("./../../validation/validation");


// @route    POST api/v2/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post('/comment/:id', passport.authenticate("jwt", {
  session: false
}), postComment);

// @route    Post api/v2/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.post('/unlike/:id', passport.authenticate("jwt", {
  session: false
}), unlikePost);


// @route    POST api/v2/posts/like/:id
// @desc     Like a post
// @access   Private
router.post('/like/:id', passport.authenticate("jwt", {
  session: false
}), likePost);

// @route    DELETE api/v2/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', passport.authenticate("jwt", {
  session: false
}), deletePost)

// @route    GET api/v2/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', passport.authenticate("jwt", {
  session: false
}), getPostId);


//router.get("/", getTest);


// @route    POST api/v2/posts
// @desc     Create a post
// @access   Private
router.post("/", passport.authenticate("jwt", {
  session: false
}), userPostValidationRules(), validate, addPost);

// @route    GET api/v2/posts
// @desc     Get all posts
// @access   Private
router.get("/", passport.authenticate("jwt", {
  session: false
}), getAllPosts);

module.exports = router;