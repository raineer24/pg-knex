const User = require("../../models/users");
const Post = require("../../models/post");
const {
  raw
} = require('objection');
const Likes = require("../../models/likes");
const log = require("color-logs")(true, true, "Post");
const {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} = require("../../helpers/error_helper");


// @route    POST api/v2/posts/like/:id
// @desc     Like a post
// @access   Private
const likePost = async (req, res, next) => {
  const {
    id
  } = req.params;
  console.log('id : ', typeof id);
  console.log(req.user.id);



  //  Tweet
  //  .query()
  //  .leftJoinRelation('likers', currentUserId, '=', 'likers.id')
  //  .select('tweets.*', knex.raw(`IF('${currentUserId}'=likers.id,'True','False') AS isLikedByYou`))
  try {
    // const post = await Post
    //   .query()
    //   .leftJoinRelation('likes', req.user.id, '=', 'likes.users_id')
    //    .select('post.*', raw(`IF('${req.user.id}'=likes.users_id,'True','False') AS isLikedByYou`));
    const post = await Likes.query();

    let likesUserId = post[0].users_id;
    console.log('likesUserID', likesUserId);


    if (Array.isArray(post)) {
      console.log('is an array');

    }

    if (likesUserId === req.user.id) {
      console.log('sane id');

    }

    //const existingUserlikes = ;
    //console.log('existinguserlikes', existingUserlikes);


    // const post = await Post.query().select('post.*', Post.relatedQuery('likes').count().as('numberofLikes'));
    //const likes = await Likes.query();
    // const tweets = await Tweet.query().select(
    //   'Tweet.*',
    //   Tweet.relatedQuery('likes')
    //     .count()
    //     .as('numberOfLikes')
    // );
    //console.log(tweets[4].numberOfLikes);
    //console.log('post: ', post[0].numberofLikes);
    //console.log('post', post);


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




  //check user
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

module.exports = {
  getTest,
  addPost,
  deletePost,
  getAllPosts,
  getPostId,
  likePost
};