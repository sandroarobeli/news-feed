const { validationResult } = require("express-validator");
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
  } catch (error) {
    return next(new Error(`Update failed: ${error.message}`)); // 500
  }
};

module.exports = update;
