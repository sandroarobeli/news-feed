const cloudinary = require("cloudinary").v2;

require("../../config");
const multimediaUploadForm = require("../../modules/multimedia-module");
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;

const getMultimediaSignature = (req, res, next) => {
  const signature = multimediaUploadForm();
  res.json({
    signature: signature.signature,
    timestamp: signature.timestamp,
    cloudName,
    apiKey,
  });
};

module.exports = getMultimediaSignature;
