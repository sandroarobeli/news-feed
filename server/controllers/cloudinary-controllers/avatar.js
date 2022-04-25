const cloudinary = require("cloudinary").v2;

require("../../config");
const avatarUploadForm = require("../../modules/avatar-module");
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;

const getAvatarSignature = (req, res, next) => {
  const signature = avatarUploadForm();
  res.json({
    signature: signature.signature,
    timestamp: signature.timestamp,
    cloudName,
    apiKey,
  });
};

module.exports = getAvatarSignature;
