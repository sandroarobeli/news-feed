const cloudinary = require("cloudinary").v2;

require("../config");
const signature = require("../modules/cloudinary-modules");
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;

const getSignature = (req, res, next) => {
  const sig = signature.fileUploadForm();
  res.json({
    signature: sig.signature,
    timestamp: sig.timestamp,
    cloudName,
    apiKey,
  });
};

exports.getSignature = getSignature;
