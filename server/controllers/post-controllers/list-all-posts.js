const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Post = require("../../models/post-model");

// List All Posts
const listAllPosts = async (req, res, next) => {
  try {
    let posts = await Post.find({}).populate("creator");
    if (posts.length === 0) {
      res.status(200).json({ posts: [] });
    }
    // res.status(200).json({
    //   posts: posts.map((post) => ({
    //     _id: post._id,
    //     content: post.content,
    //     media: post.media,
    //     creator: {
    //       userName: post.creator.userName,
    //       userAvatar: post.creator.userAvatar,
    //       numberOfPosts: post.creator.posts.length,
    //     },
    //     date: post.date,
    //     reactions: post.reactions,
    //   })),
    // });

    res.status(200).json({ posts: posts });
  } catch (error) {
    return next(new Error(`Unable to retrieve posts: ${error.message}`));
  }
};

module.exports = listAllPosts;
