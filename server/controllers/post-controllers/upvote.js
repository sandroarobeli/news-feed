const Post = require("../../models/post-model");
const User = require("../../models/user-model");

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
    console.log("Reactions Update:"); // test
    console.log(updatedPost.reactions); // test
    res.status(200).json({ post: updatedPost });
  } catch (error) {
    return next(new Error(`Post upvoting unavailable: ${error.message}`));
  }
};

module.exports = upvote;
