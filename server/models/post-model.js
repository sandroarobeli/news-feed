const mongoose = require("mongoose");

const User = require("./user-model"); // test

// Define Post Schema
const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  media: {
    type: String,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  date: {
    type: Date,
    required: true,
  },
  reactions: {
    type: {
      thumbsUp: Number,
      thumbsDown: Number,
    },
    required: true,
  },
});

// Populates Post creator before saving. Enables instant display of Post author
postSchema.pre("save", async function (next) {
  const post = this;
  await post.populate("creator");
  next();
});

// Define Post class per its Schema (Blueprint)
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
