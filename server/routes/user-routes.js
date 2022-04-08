const express = require("express");
const { check } = require("express-validator");

const signup = require("../controllers/user-controllers/signup");
const login = require("../controllers/user-controllers/login");

// Initializing the router object
const router = express.Router();

// Signup a User
router.post(
  "/signup",
  [
    check("userName").not().isEmpty().trim().escape(),
    check("password").isLength({ min: 6 }), // Adjust-restore per user requirements
    //check("userAvatar").not().isEmpty().trim().escape(), // avatar is not a must...
  ],
  signup
);

// Login a User
router.post(
  "/login",
  [check("userName").not().isEmpty().trim().escape(), check("password").not().isEmpty()],
  login
);

// More to be added...

module.exports = router;
