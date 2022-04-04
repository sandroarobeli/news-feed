const cloudinary = require("cloudinary").v2;
require("../config");
const apiSecret = cloudinary.config().api_secret;

// Server-side function used to sign an upload
const fileUploadForm = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      //eager: "c_pad,w_150,h_150",
      eager: "c_fill,w_150,h_150",
      folder: "news-feed",
    },
    apiSecret
  );

  return { timestamp, signature };
};

module.exports = {
  fileUploadForm,
};
