const mongoose = require("mongoose");

const Post = require("./post-model");

// Define User Schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  userAvatar: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  ],
});

// Define User class per its Schema (Blueprint)
const User = mongoose.model("User", userSchema);

module.exports = User;
