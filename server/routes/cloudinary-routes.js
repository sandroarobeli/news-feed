const express = require("express");
const router = express.Router();

const getAvatarSignature = require("../controllers/cloudinary-controllers/avatar");
const getMultimediaSignature = require("../controllers/cloudinary-controllers/multimedia");

// using this API should require authentication through Cloudinary api-key
// Invokes functions for image functionality only (User Avatar) small dimensions
router.get("/avatar", getAvatarSignature);

// Invokes functions for image & video (Media Loader) large dimensions
router.get("/multimedia", getMultimediaSignature);

module.exports = router;
