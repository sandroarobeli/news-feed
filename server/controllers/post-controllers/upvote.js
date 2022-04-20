const Post = require("../../models/post-model");

// Upvote a Post
const upvote = async (req, res, next) => {
  const { postId } = req.body;
  try {
    let updatedPost;
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      // Post doesn't exist
      return next(new Error("Post not found"));
    }

    updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        reactions: {
          ...existingPost.reactions,
          thumbsUp: ++existingPost.reactions.thumbsUp,
        },
      },
      { new: true }
    );

    res.status(200).json({ post: updatedPost });
  } catch (error) {
    return next(new Error(`Post upvoting unavailable: ${error.message}`));
  }
};

module.exports = upvote;
