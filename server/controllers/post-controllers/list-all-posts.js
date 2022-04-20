require("dotenv").config();

const Post = require("../../models/post-model");

// List All Posts
const listAllPosts = async (req, res, next) => {
  try {
    let posts = await Post.find({}).populate("creator");
    if (posts.length === 0) {
      res.status(200).json({ posts: [] });
    }

    res.status(200).json({ posts: posts });
  } catch (error) {
    return next(new Error(`Unable to retrieve posts: ${error.message}`));
  }
};

module.exports = listAllPosts;
