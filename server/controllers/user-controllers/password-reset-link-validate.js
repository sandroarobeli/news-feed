// Get & ValidateTime time sensitive link to password reset page
const passwordResetLinkValidate = async (req, res, next) => {
  try {
    const emailToken = req.params.emailToken;
    // If there is NO token received with request.params
    if (!emailToken) {
      return next(
        new Error("This link has either expired or is invalid. Please submit your email again.")
      );
    }
    // There IS a token object received with request.params
    res.redirect("http://127.0.0.1:3000/resetPasswordForm");
  } catch (error) {
    return next(new Error(`Invalid link. Please try again later: ${error.message}`)); // 500
  }
};

module.exports = passwordResetLinkValidate;
