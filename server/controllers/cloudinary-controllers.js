const cloudinary = require("cloudinary").v2;

require("../config");
const fileUploadForm = require("../modules/cloudinary-modules");
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;

const getSignature = (req, res, next) => {
  const signature = fileUploadForm();
  res.json({
    signature: signature.signature,
    timestamp: signature.timestamp,
    cloudName,
    apiKey,
  });
};

module.exports = getSignature;
