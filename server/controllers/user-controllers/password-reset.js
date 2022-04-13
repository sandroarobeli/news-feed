const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../../models/user-model");

const passwordReset = async (req, res, next) => {
  // Middleware registered in the routes gets invoked here
  // If returned errors object isn't empty, error is passed down the chain via next()
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("Invalid inputs entered. Please check your data")); // 422
  }
  // Getting manually entered properties from the user request
  const { userName, newPassword } = req.body;

  try {
    //let updatedUser;
    // Make sure username exists
    const existingUser = await User.findOne({ userName: userName });
    if (!existingUser) {
      return next(new Error("Username not found. Make sure to enter the correct Username!"));
    }

    // Hashing plain text password before saving it in DB
    let hashedPassword; // second argument is number of cascades used to encrypt it
    try {
      hashedPassword = await bcrypt.hash(newPassword, 8);
    } catch (error) {
      return next(new Error("Unable to update password. Please try again later."));
    }

    // If so, password gets updated
    updatedUser = await User.findByIdAndUpdate(
      existingUser._id,
      { password: hashedPassword },
      { new: true }
    );

    // No need to send anything
    res.status(200).json({
      user: updatedUser,
    });
  } catch (error) {
    return next(new Error(`Password update failed: ${error.message}`)); // 500
  }
};

module.exports = passwordReset;
