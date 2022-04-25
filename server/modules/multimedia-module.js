const cloudinary = require("cloudinary").v2;
require("../config");

const apiSecret = cloudinary.config().api_secret;

// Server-side function used to sign an upload
const multimediaUploadForm = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  // TENTATIVELY: LOOKS LIKE ALL THE FORMATS, EAGERS ETC GO HERE AND ARE REPEATED AT FORMDATA!!!
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      eager: "b_auto,c_fill_pad,g_auto,h_150,w_600",
      //eager: "c_fill_pad,g_auto,h_150,w_600",
      folder: "news-feed",
    },
    apiSecret
  );

  return { timestamp, signature };
};

module.exports = multimediaUploadForm;
