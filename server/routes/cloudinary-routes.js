const express = require("express");
const router = express.Router();

const getSignature = require("../controllers/cloudinary-controllers");

// using this API should require authentication through Cloudinary api-key
router.get("/", getSignature);

module.exports = router;
