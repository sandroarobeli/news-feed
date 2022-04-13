// TIMER IS SET FOR 15 MINUTES. THIS MODULE SETS TIMER AND RETURNS TO REDUCER
// REDUCER SAVES THAT TIMER AS A VARIABLE IN LOCAL STORAGE
// APP READS THAT VARIABLE AND MAKES ROUTE ACCESSIBLE OR NOT BASED TIMER EXPIRATION
// IT ALSO SENDS EMAIL WITH THE TIME SENSITIVE LINK TO PASSWORD RESET PAGE
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const resetLinkEmail = require("../../modules/email-modules");

const email = async (req, res, next) => {
  // Middleware registered in the routes gets invoked here
  // If returned errors object isn't empty, error is passed down the chain via next()
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("Email is missing or invalid. Please provide valid email."));
  }
  const { email } = req.body;
  // Generate separate token for authorized link and pass it to email function
  let emailToken;
  try {
    emailToken = jwt.sign({ userEmail: email }, process.env.SECRET_TOKEN_KEY, {
      expiresIn: "15m",
    });
  } catch (error) {
    return next(new Error(error.message));
  }
  try {
    // Invoke email generating function with user email & unique token
    resetLinkEmail(email, emailToken);
    res.status(200).json({
      user: {
        emailTokenExpiration: new Date().getTime() + 1000 * 60 * 15, // Application set for 15 minutes
        //emailTokenExpiration: new Date().getTime() + 1000 * 60 * 2, // Testing set for 2 minutes
      },
    });
  } catch (error) {
    return next(new Error(`Password reset currently unavailable: ${error.message}`));
  }
};

module.exports = email;
