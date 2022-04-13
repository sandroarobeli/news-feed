const sgMail = require("@sendgrid/mail");
require("dotenv").config();

// sendGridMail object
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Emails time sensitive password reset link to user
const resetLinkEmail = async (email, emailToken) => {
  try {
    await sgMail.send({
      to: email,
      from: process.env.SENDER,
      subject: "Password Reset",
      text: "Password reset instructions:",
      html: `<h3>Follow the link below to reset your password.</h3>
             <a href="http://127.0.0.1:5000/api/user/passwordResetLinkValidate/${emailToken}" target="_blank" rel="noopener">Reset password</a>
             <p>Please note this link will only be active for 15 minutes</p>
            `,
    });
    console.log("Reset link Email sent successfully to: " + email);
  } catch (error) {
    console.log(error.response.body); // test
    throw new Error("Email sending failed");
  }
};

module.exports = resetLinkEmail;
