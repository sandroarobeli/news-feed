const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user-model");

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
    // await createdUser.save() RESTORE

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
      },
    });
  } catch (error) {
    return next(new Error(`Creating User failed: ${error.message}`)); // 500
  }
};

// Login a User
// const login = async (req, res, next) => {
//     const { email, password } = req.body

//     try {
//         // Checking if email already exists
//         const existingUser = await User.findOne({ email })
//         if (!existingUser) {
//             return next(new Error('The email not found. Please enter a valid email or proceed to signup.'))
//         }
//         // Check if existingUser.password matches hashed version of newly entered plaintext password
//         let isValidPassword = false
//         try {
//             isValidPassword = await bcrypt.compare(password, existingUser.password)
//         } catch (error) {
//             return next(new Error(`Login failed. Please try again later.\n${error.message}`))
//         }
//         // Catch block right above deals with connection etc. type errors
//         // isValidPassword = false is a valid result and gets addressed below
//         if (!isValidPassword) {
//             return next(new Error('Invalid credentials entered. Please check your credentials and try again'))
//         }
//         // After we ensure user(its email) exists, and the passwords match,
//         // We can generate the Token
//         // This way, frontend will attach this token to the requests going to routes that
//         // REQUIRE AUTHORIZATION
//         let token
//         try {
//             token = jwt.sign(
//                 { userId: existingUser._id },
//                 process.env.SECRET_TOKEN_KEY,
//                 { expiresIn: '1h' }
//             )
//         } catch (error) {
//             return next(new Error('Login failed. Please try again'))
//         }
//         // Sending back whatever data we want with created token
//         // res.status(201).json({ user: createdUser })
//         res.status(201).json(
//             {
//                 user: {
//                     userName: existingUser.userName,
//                     email: existingUser.email,
//                     userId: existingUser._id,
//                     posts: existingUser.posts,
//                     token: token
//                 }
//             }
//         )

//     } catch (error) {
//         return next(new Error(`Login failed: ${error.message}`))
//     }
// }

// MORE TO BE ADDED...

exports.signup = signup;
//exports.login = login
