const User = require("../../models/users");
const Post = require("../../models/post");
const log = require("color-logs")(true, true, "User Profile");

const getTest = (req, res, next) => {
      
    res.json({ msg: "Profile works" });
  };

  // @route    POST api/v2/posts
// @desc     Create a post
// @access   Private
const addPost = async(req, res,next) => {

  const {
    title,
    body
  } = req.body;

  const insertData = {
    users_id: req.user.id,
    title,
    body
  }

  try {

    const user = await User.query().findById(req.user.id);
    if (user) {
      const postData = await insertPost(insertData);
      return res.status(200).json({ success: true, postData });
    }
    
      } catch (error) {
    log.error(`Post controller[Add post]: Failed to send ${error}`);

    return next(error);
  }
}

// @route    GET api/v2/posts
// @desc     Get all posts
// @access   Private
const getAllPosts = async(req,res,next) => {
  res.json({ msg: "Profile works" });
}

async function insertPost(datus) {
  try {
    const result = await Post.query().insertGraph(datus);

    return result;
  } catch (error) {
    throw error;
  }
}

  module.exports = {
    getTest,
    addPost,
    getAllPosts
  };