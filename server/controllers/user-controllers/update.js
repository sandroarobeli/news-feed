const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../models/user-model");

// Update a User
const update = async (req, res, next) => {
  // Middleware registered in the routes gets invoked here
  // If returned errors object isn't empty, error is passed down the chain via next()
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("Invalid inputs entered. Please check your data")); // 422
  }
  // Getting manually entered properties from the user request
  const { currentUserName, updatedUserName, userAvatar } = req.body;

  try {
    // alternative start
    let updatedUser;
    // If userName has been changed
    if (currentUserName !== updatedUserName) {
      // See if someone already has it
      const existingUser = await User.findOne({ userName: updatedUserName });
      if (existingUser) {
        // Someone already has this userName
        return next(new Error("This Username already exists. Please choose another Username"));
      }
    }
    // Otherwise new userName and possibly userAvatar get updated
    updatedUser = await User.findByIdAndUpdate(
      req.userData.userId,
      { userName: updatedUserName, userAvatar },
      { new: true }
    );
    res.status(200).json({
      user: {
        userName: updatedUser.userName,
        userAvatar: updatedUser.userAvatar,
      },
    });

    // alternative end

    /*
    let updatedUser;
    // userName HASN'T been changed
    if (currentUserName === updatedUserName) {
      // Unchanged userName and possibly changed userAvatar update
      updatedUser = await User.findByIdAndUpdate(
        req.userData.userId,
        { userName: currentUserName, userAvatar },
        { new: true }
      );
    } else {
      // userName HAS been changed
      const existingUser = await User.findOne({ userName: updatedUserName });
      console.log("existing user"); // test
      console.log(existingUser); // test
      if (existingUser) {
        // Someone already has this userName
        return next(new Error("This Username already exists. Please choose another Username"));
      }
      // Otherwise new userName and possibly userAvatar get updated
      updatedUser = await User.findByIdAndUpdate(
        req.userData.userId,
        { userName: updatedUserName, userAvatar },
        { new: true }
      );
    }
    res.status(200).json({
      user: {
        userName: updatedUser.userName,
        // userId: updatedUser._id,
        userAvatar: updatedUser.userAvatar,
        // posts: existingUser.posts,
        // token: token,
        // Sets time to 10 Seconds for TESTING
        //expiration: new Date().getTime() + 1000 * 10,
        // Sets time to 1 Hour for THIS application
        // expiration: new Date().getTime() + 1000 * 60 * 60,
      },
    });

    */
  } catch (error) {
    return next(new Error(`Update failed: ${error.message}`)); // 500
  }
};

// TEST BEGIN
/*
const updatePlaceById = async (req, res, next) => {
  const placeId = req.params.placeId
  const { title, description } = req.body

  let updatedPlace
  try {
      updatedPlace = await Place.findById(placeId)
      // Checking if we can find the place
      if (!updatedPlace) {
          return next(new HttpError(`Place could not be found`, 404))
      }
      // Once found, we make sure (here, on backend) that ONLY whomever created This
      // Place MAY update it as well!
      if (updatedPlace.creator.toString() !== req.userData.userId) {
          // updatedPlace.creator --> WHO CREATED THIS PLACE
          // req.userData.userId --> WHO IS CURRENTLY LOGGED IN
          return next(new HttpError(`You are not authorized to edit this place!`, 401))
      }
      // Once verified, we allow the editing to proceed
      updatedPlace = await Place.findByIdAndUpdate(
          placeId,
          { title, description },
          { new: true }
      )

      res.status(200).json({ place: updatedPlace.toObject({ getters: true }) })
  } catch (error) {
      return next(new HttpError(`Updating Place failed: ${error.message}`, 500))
  }
}
*/
// TEST END

/*
// Signup a User
const signup = async (req, res, next) => {
  // Middleware registered in the routes gets invoked here
  // If returned errors object isn't empty, error is passed down the chain via next()
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("Invalid inputs entered. Please check your data")); // 422
  }

  // Getting manually entered properties from the user request
  const { userName, password, userAvatar } = req.body;

  // Check if entered email already exists to prevent duplication
  try {
    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return next(new Error("This Username already exists. Please choose another Username")); // 422
    }
  } catch (error) {
    return next(new Error(`Signup failed: ${error.message}`)); // 500
  }

  // Hashing plain text password before saving it in DB
  let hashedPassword; // second argument is number of cascades used to encrypt it
  try {
    hashedPassword = await bcrypt.hash(password, 8);
  } catch (error) {
    return next(new Error("Creating User failed. Please try again"));
  }

  // combining all of above to create a new user
  const createdUser = new User({
    userName,
    password: hashedPassword,
    userAvatar,
    posts: [],
  });

  try {
    // await createdUser.save(); // RESTORE

    // Create token, so we can send it back as proof of authorization.
    // We get to decide what data we encode. This time it's userId
    // This way, frontend will attach this token to the requests going to routes that
    // REQUIRE AUTHORIZATION
    let token;
    try {
      // UserId: createdUser._id is encoded into token using unique secret key
      token = jwt.sign({ userId: createdUser._id }, process.env.SECRET_TOKEN_KEY, {
        expiresIn: "1h",
      });
    } catch (error) {
      return next(new Error("Creating User failed. Please try again")); // 500
    }
    // Sending back whatever data we want with created token
    // res.status(201).json({ user: createdUser })
    res.status(201).json({
      user: {
        userName: createdUser.userName,
        userId: createdUser._id,
        userAvatar: createdUser.userAvatar,
        posts: createdUser.posts,
        token: token,
        // Sets time to 10 Seconds for TESTING
        // expiration: new Date().getTime() + 1000 * 10,
        // Sets time to 1 Hour for THIS application
        expiration: new Date().getTime() + 1000 * 60 * 60,
      },
    });
  } catch (error) {
    return next(new Error(`Creating User failed: ${error.message}`)); // 500
  }
};
*/
module.exports = update;
