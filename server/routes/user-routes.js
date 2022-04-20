const express = require("express");
const { check } = require("express-validator");

const signup = require("../controllers/user-controllers/signup");
const login = require("../controllers/user-controllers/login");
const update = require("../controllers/user-controllers/update");
const email = require("../controllers/user-controllers/email");
const passwordResetLinkValidate = require("../controllers/user-controllers/password-reset-link-validate");
const passwordReset = require("../controllers/user-controllers/password-reset");
const checkAuthorization = require("../modules/check-authorization");

// Initializing the router object
const router = express.Router();

// Signup a User
router.post(
  "/signup",
  [check("userName").not().isEmpty().trim().escape(), check("password").isLength({ min: 6 })],
  signup
);

// Login a User
router.post(
  "/login",
  [check("userName").not().isEmpty().trim().escape(), check("password").not().isEmpty()],
  login
);

// Update a User. Privileged, requires authentication
router.patch(
  "/update",
  checkAuthorization,
  [
    check("currentUserName").not().isEmpty().trim().escape(),
    check("updatedUserName").not().isEmpty().trim().escape(),
  ],
  update
);

// Send a password reset link via email
router.post("/email", [check("email").normalizeEmail().isEmail()], email);

// Get & Validate time sensitive link to password reset page
router.get("/passwordResetLinkValidate/:emailToken", passwordResetLinkValidate);

// Reset User password
router.patch(
  "/passwordReset",
  [check("userName").not().isEmpty().trim().escape(), check("newPassword").not().isEmpty()],
  passwordReset
);

// Delete User

module.exports = router;
