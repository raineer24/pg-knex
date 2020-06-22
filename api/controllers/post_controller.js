const User = require("../../models/users");
const Post = require("../../models/post");
const {
  raw
} = require('objection');
const Likes = require("../../models/likes");
const Comments = require("../../models/comments");
const log = require("color-logs")(true, true, "Post");
const {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} = require("../../helpers/error_helper");


// @route    DELETE api/v2/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
const deleteComment = async (req, res, next) => {
  try {
    console.log('users_id', req.user.id);

    const post = await Post.query().findById(req.params.id);
    console.log('post', post);

    if (!post) {
      return next(
        createError({
          status: CONFLICT,
          message: "Post does not exist!"
        })
      );
    }
    if (post) {
      const comment = await Comments.query().findById(req.params.comment_id);
      if (!comment) {
        return next(
          createError({
            status: CONFLICT,
            message: "Comment does not exist!"
          })
        );
      } else if (comment.users_id !== req.user.id) {
        console.log('comment', comment.users_id);
        console.log('req,yser', req.user.id);
        return next(
          createError({
            status: CONFLICT,
            message: "User not authorized!"
          })
        );
      } else {
        const deleteComment = await Comments.query().findById(req.params.comment_id).delete();
        return res.status(200).json({
          success: true,
          msg: 'Comment Deleted'
        });
      }

    }

  } catch (error) {
    log.error(`Post controller[Delete comment]: Failed to send ${error}`);

    return next(error);
  }
};

// @route    POST api/v2/posts/comment/:id
// @desc     Comment on a post
// @access   Private
const postComment = async (req, res, next) => {
  try {
    const newComment = {
      post_id: parseInt(req.params.id),
      body: req.body.body,
      users_id: req.user.id
    };

    const user = await User.query().findById(req.user.id);
    if (user) {
      const post = await Post.query().findById(req.params.id);
      if (post) {
        const commentInsert = await insertComment(newComment);
        return res.status(200).json({
          success: true,
          commentInsert
        });
      }

    }

  } catch (error) {
    log.error(`Post controller[Post comment]: Failed to send ${error}`);

    return next(error);
  }
};


// @route    Post api/v2/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
const unlikePost = async (req, res, next) => {
  try {
    const post = await Post.query().findById(req.params.id);
    const existinglikes = await post.$relatedQuery('likes').map(l => l.users_id);

    // Check if the post has not yet been liked
    //  if (!post.likes.some(like => like.user.toString() === req.user.id)) {
    //    return res.status(400).json({
    //      msg: 'Post has not yet been liked'
    //    });
    //  }
    if (post) {
      if (!existinglikes.includes(req.user.id)) {
        return next(
          createError({
            status: CONFLICT,
            message: "Post has not yet been liked!"
          })
        );
      } else {
        const unlike = await Likes.query().where('users_id', req.user.id).delete();
        return res.status(200).json({
          success: true,
          message: 'You unliked the post!'
        });
      }

    }

  } catch (error) {
    log.error(`Post controller[unLike post]: Failed to send ${error}`);

    return next(error);
  }
};


// @route    POST api/v2/posts/like/:id
// @desc     Like a post
// @access   Private
const likePost = async (req, res, next) => {
  const {
    id
  } = req.params;
  const like = await Likes.query();
  const userLike_id = like.map(l => l.users_id);
  try {
    const likePosts = {
      post_id: parseInt(id),
      users_id: req.user.id,
      likedbyme: req.user.id === userLike_id ? false : true
    };


    console.log(userLike_id);

    const post = await Post.query().findById(req.params.id);
    const existinglikes = await post.$relatedQuery('likes').map(l => l.users_id);

    if (existinglikes.includes(req.user.id)) {
      return next(
        createError({
          status: CONFLICT,
          message: "You already liked this post!"
        })
      );
    } else {
      const userLikedPost = await likesPost(likePosts);
      return res.status(200).json({
        success: true,
        message: 'You liked the post!'
      });
    }

  } catch (error) {
    log.error(`Post controller[Like post]: Failed to send ${error}`);

    return next(error);
  }

}

// @route    DELETE api/v2/posts/:id
// @desc     Delete a post
// @access   Private
const deletePost = async (req, res, next) => {
  const post = await Post.query().findById(req.params.id);

  if (!post) {
    return next(
      createError({
        status: CONFLICT,
        message: "No Post found!"
      })
    );
  } else if (post.users_id !== req.user.id) {
    return next(
      createError({
        status: CONFLICT,
        message: "User not authorized!"
      })
    );
  } else {
    const postDelete = await Post.query().findById(req.params.id).delete();
    return res.status(200).json({
      success: true,
      msg: 'Post data Deleted'
    });
  }
}


const getTest = (req, res, next) => {

  res.json({
    msg: "Profile works"
  });
};

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
const getPostId = async (req, res, next) => {
  try {
    const post = await Post.query().findById(req.params.id);

    if (!post) {
      return next(
        createError({
          status: CONFLICT,
          message: "No Post found!"
        })
      );
    }
    return res.status(200).json({
      success: true,
      post
    });



  } catch (error) {
    log.error(`Post controller[Get post by Id]: Failed to send ${error}`);

    return next(error);
  }
}

// @route    POST api/v2/posts
// @desc     Create a post
// @access   Private
const addPost = async (req, res, next) => {

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
      return res.status(200).json({
        success: true,
        postData
      });
    }

  } catch (error) {
    log.error(`Post controller[Add post]: Failed to send ${error}`);

    return next(error);
  }
}

// @route    GET api/v2/posts
// @desc     Get all posts
// @access   Private
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.query().orderBy('publish_date', 'desc');;
    return res.status(200).json({
      success: true,
      posts
    });

  } catch (error) {
    log.error(`Post controller[Get all posts]: Failed to send ${error}`);

    return next(error);
  }
}

async function insertPost(datus) {
  try {
    const result = await Post.query().insertGraph(datus);

    return result;
  } catch (error) {
    throw error;
  }
}

async function likesPost(datus) {
  try {
    const result = await Likes.query().insertGraph(datus);

    return result;
  } catch (error) {
    throw error;
  }
}

async function insertComment(datus) {
  try {
    const result = await Comments.query().insertGraph(datus);

    return result;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getTest,
  addPost,
  deletePost,
  getAllPosts,
  getPostId,
  likePost,
  unlikePost,
  postComment,
  deleteComment
};