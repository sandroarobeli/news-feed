const Post = require("../../models/post-model");

// Downvote a Post
const downvote = async (req, res, next) => {
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
          thumbsDown: ++existingPost.reactions.thumbsDown,
        },
      },
      { new: true }
    );
    console.log("Reactions Update:"); // test
    console.log(updatedPost.reactions); // test
    res.status(200).json({ post: updatedPost });
  } catch (error) {
    return next(new Error(`Post downvoting unavailable: ${error.message}`));
  }
};

module.exports = downvote;
