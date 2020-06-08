const getTest = (req, res, next) => {
      
    res.json({ msg: "Profile works" });
  };

  // @route    POST api/v2/posts
// @desc     Create a post
// @access   Private
const addPost = async(req, res,next) => {
  try {
    res.json({ msg: "Profile works" });
  } catch (error) {
    log.error(`Post controller[Add post]: Failed to send ${error}`);

    return next(error);
  }
}

  module.exports = {
    getTest,
    addPost
  };