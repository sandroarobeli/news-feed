const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/user-controllers");

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
  userControllers.signup
);

// Login a User
router.post(
  "/login",
  [check("userName").not().isEmpty().trim().escape(), check("password").not().isEmpty()],
  userControllers.login
);

// MORE TO BE ADDED...

module.exports = router;
