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

  const data = {
    users_id: req.user.id,
    title,
    body
  }

  try {

    const user = await User.query().findById(req.user.id);
    if (user) {

    }
    
    res.json({ msg: "Profile works" });
  } catch (error) {
    log.error(`Post controller[Add post]: Failed to send ${error}`);

    return next(error);
  }
}

async function InsertPost(datus) {
  try {
    const result = await Post.query().insertGraph(datus);

    return result;
  } catch (error) {
    throw error;
  }
}

  module.exports = {
    getTest,
    addPost
  };