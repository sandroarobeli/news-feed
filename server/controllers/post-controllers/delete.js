const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Post = require("../../models/post-model");

// Deletes a Post
const deletePost = async (req, res, next) => {
  const { postId } = req.body;
  let deletedPost;
  try {
    // Makes full User object available via Place
    deletedPost = await Post.findById(postId).populate("creator");
    if (!deletedPost) {
      return next(new Error(`Post could not be found`));
    }
    // Once found, we make sure (here, on backend) that ONLY whomever created This
    // Place MAY delete it as well! NOTE: since 'creator' is populated, it's
    // displayed a full object with all the User props for creator. Hence,
    // we first go to _id prop and then convert it to string!
    if (deletedPost.creator._id.toString() !== req.userData.userId) {
      return next(new Error("Authorization denied!"));
    }
    console.log("deleted post"); // test
    console.log(deletedPost); // test
    console.log("token"); // test
    console.log(req.userData.userId); // test

    const session = await mongoose.startSession();
    // Begin Transaction
    session.startTransaction();
    await deletedPost.remove({ session: session });
    deletedPost.creator.posts.pull(deletedPost); // This pull method is unique to mongoose. Removes postId from user
    await deletedPost.creator.save({ session: session });
    await session.commitTransaction();
    // End Transaction

    res.status(200).json({ post: deletedPost });
  } catch (error) {
    return next(new Error(`Deleting Post failed: ${error.message}`));
  }
};

module.exports = deletePost;
