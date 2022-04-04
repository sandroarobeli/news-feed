const express = require("express");
const router = express.Router();

const signupControllers = require("../controllers/cloudinary-controllers");

// using this API should require authentication through Cloudinary api-key
router.get("/", signupControllers.getSignature);

module.exports = router;
