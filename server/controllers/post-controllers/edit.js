const { validationResult } = require("express-validator");

const Post = require("../../models/post-model");
const User = require("../../models/user-model");

// Update a Post
const edit = async (req, res, next) => {
  // Middleware registered in the routes gets invoked here
  // If returned errors object isn't empty, error is passed down the chain via next()
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("Invalid inputs entered. Please check your data")); // 422
  }
  const { content, postId } = req.body;

  // Check to make sure the Post exists
  let updatedPost;
  try {
    //const existingPost = await Post.findById(postId).populate("creator");
    updatedPost = await Post.findById(postId);
    if (!updatedPost) {
      return next(new Error("Update failed. Post not found"));
    }
    // Find current Post author and make sure (here, on backend) that ONLY whomever token belongs to
    // (i.e. whomever created the post) MAY update it as well!
    // const postAuthor = await User.findById(existingPost.creator._id); // RESTORE IF NEEDED
    if (updatedPost.creator.toString() !== req.userData.userId) {
      // postAuthor._id --> WHO THIS POST WILL BELONG TO
      // req.userData.userId --> WHO IS CURRENTLY LOGGED IN
      return next(new Error(`Authorization Denied!`));
    }
    // Otherwise the Post gets updated
    updatedPost = await Post.findByIdAndUpdate(postId, { content: content }, { new: true });
    //res.status(200).json({});
    res.status(200).json({ post: updatedPost });
  } catch (error) {
    return next(new Error(`Updating Post failed: ${error.message}`));
  }
};

module.exports = edit;
