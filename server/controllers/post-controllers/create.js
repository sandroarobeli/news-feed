const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Post = require("../../models/post-model");
const User = require("../../models/user-model");

// Create a Post. Privileged, requires authorization
const create = async (req, res, next) => {
  console.log("request.userData added by authorization module"); // test
  console.log(req.userData); // test

  // Middleware registered in the routes gets invoked here
  // If returned errors object isn't empty, error is passed down the chain via next()
  // THIS TRY-CATCH ENSURES PROCESSING OF INPUT PROPERTIES
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("Invalid inputs entered. Post content can not be empty"));
  }

  const { content, media, creator } = req.body;
  const createdPost = new Post({
    content,
    media,
    creator,
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 0,
      thumbsDown: 0,
    },
  });

  // This block ensures that only existing user can create a new post
  let existingUser;
  try {
    existingUser = await User.findById(creator);
    if (!existingUser) {
      return next(new Error("Creating Post failed. Corresponding User not found"));
    }
  } catch (error) {
    return next(new Error(`Creating Post failed: ${error.message}`));
  }

  console.log("existingUser"); // test
  console.log(existingUser); // test

  // Once found, we make sure (here, on backend) that ONLY whomever token belongs to
  // MAY create a new post!
  if (existingUser._id.toString() !== req.userData.userId) {
    // existingUser._id --> WHO THIS POST WILL BELONG TO
    // req.userData.userId --> WHO IS CURRENTLY LOGGED IN
    return next(new Error(`Authorization Denied!`));
  }
  // THIS TRY-CATCH ENSURES PROPER NETWORK PROTOCOL EXCHANGE
  try {
    // Transactions let you execute multiple operations
    // In isolation and potentially undo all the operations if one of them fails.
    const session = await mongoose.startSession();
    // Begin Transaction
    session.startTransaction();
    await createdPost.save({ session: session });
    existingUser.posts.push(createdPost); // This push method is unique to mongoose. Adds placeId to user
    await existingUser.save({ session: session });
    await session.commitTransaction();
    // End Transaction
    res.status(201).json({ post: createdPost });
  } catch (error) {
    return next(new Error(`Creating Post failed: ${error.message}`));
  }
};

// FROM HERE: ADD THE WHOLE BLOCK TO THIS CONTROLLER, THEN MOVE TO THUNK
// USER GETS ADDED HERE!
// DO POPULATE AND TEST IT, SO THUNK STATE GETS ALREADY FILLED OUT CREATORS,
// WHICH WILL GO TO POPULATE USER AVATARS AND AUTHORS IN POSTS
module.exports = create;
