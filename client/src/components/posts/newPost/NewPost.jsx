import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";

import theme from "../../../theme/theme";
import ErrorModal from "../../shared/errorModal/ErrorModal";
import { selectUserId, selectToken } from "../../../redux/user-slice";
import {
  createPost,
  clearPostError,
  selectPostStatus,
  listAllPosts,
} from "../../../redux/posts-slice";

const styles = {
  container: {
    textAlign: "center",
    flexGrow: 1,
    margin: "1rem auto auto auto",
    borderRadius: "5px",
    maxWidth: {
      mobile: "90%",
      tablet: "70%",
      laptop: "50%",
    },
    padding: "1rem 1rem 3rem 1rem",
  },
  title: {
    fontSize: theme.typography.h5.fontSize,
    lineHeight: theme.typography.h5.lineHeight,
    fontWeight: 600,
    color: theme.palette.primary.main,
    margin: "auto",
  },
  inputProps: {
    color: "#000000",
    background: "rgba(0, 91, 187, 0.15)",
    fontWeight: 600,
    fontSize: "1.25rem",
    borderRadius: 0,
    borderBottom: "1px solid #005BBB",
    "&: hover": {
      background: "rgba(0, 91, 187, 0.35)",
    },
  },
  inputLabelProps: {
    color: "#005BBB",
    fontWeight: 400,
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1.25rem",
    color: theme.palette.secondary.main,
    background: theme.palette.primary.main,
    borderRadius: "3px",
    boxShadow: "4px 4px 4px rgba(0, 91, 187, 0.35)",
    "&:hover": {
      color: theme.palette.secondary.main,
      background: theme.palette.primary.light,
    },
    "&:active": {
      color: theme.palette.secondary.main,
      background: theme.palette.primary.light,
    },
  },
};

const MediaLoader = (props) => {
  return (
    <Card
      component="label"
      htmlFor="media"
      sx={{
        width: "100%",
      }}
    >
      <input
        id="media"
        name="media"
        type="file"
        accept="*"
        style={{ display: "none" }}
        onChange={props.onMediaUpload}
      />
      <CardMedia component={props.mediaFormat} height="150" image={props.media} alt={props.alt} />
      <CardActions>
        <Button
          type="button"
          component="span"
          sx={styles.button}
          endIcon={
            props.isLoading ? <CircularProgress color="secondary" size={25} /> : <PhotoCameraIcon />
          }
        >
          {props.isLoading ? "loading " : "Upload Media"}
        </Button>
      </CardActions>
    </Card>
  );
};
// FROM HERE: FINISH ADDING TEXT, SUBMIT MOCK, REDUX, STATE ETC. THEN GET BACK TO IMAGE UPLOAD
const NewPost = () => {
  // From Router
  const navigate = useNavigate();

  // from Redux
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUserId);
  const userToken = useSelector(selectToken);
  const postStatus = useSelector(selectPostStatus);

  // console.log("Current User:"); // test
  // console.log(currentUser); // test

  // Local state
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");
  const [mediaFormat, setMediaFormat] = useState("div"); // img
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handler functions
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleMediaUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    // Depending on video/mp4 VS image/jpeg, sets iframe VS img for CardMedia!
    if (file.type.includes("video")) {
      setMediaFormat("iframe");
    } else {
      setMediaFormat("img"); // test
    }

    const sizeIsAllowed = file.size < 5000000;

    try {
      const signedResponse = await fetch("http://127.0.0.1:5000/api/image");
      // console.log(signedResponse); // test
      const signedData = await signedResponse.json();
      console.log(signedData); // test
      console.log(file); // test
      const url = "https://api.cloudinary.com/v1_1/" + signedData.cloudName + "/auto/upload";
      // TENTATIVELY: LOOKS LIKE ALL THE FORMATS, EAGERS ETC GO HERE AND ARE REPEATED AT FORMDATA!!!
      if (sizeIsAllowed) {
        setIsLoading(true); // test
        formData.append("file", file);
        formData.append("api_key", signedData.apiKey);
        formData.append("timestamp", signedData.timestamp);
        formData.append("signature", signedData.signature);
        formData.append("eager", "b_auto,c_fill_pad,g_auto,h_150,w_600");
        //  formData.append("eager", "b_auto,c_pad,h_150,w_600");
        formData.append("folder", "news-feed");
      }
      // b_auto,c_fill_pad,g_auto,h_150,w_600 // RESTORE IF NEEDED
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const imageResponse = await response.json();
      if (!response.ok) {
        setErrorMessage(imageResponse.error.message);
      }
      //console.log(imageResponse); // test
      const mediaUrl = imageResponse.eager[0].secure_url; // URL with stylings
      setMedia(mediaUrl);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message); // Local Error state gets populated by Cloudinary error
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (postStatus === "idle") {
    try {
      await dispatch(createPost({ userToken, creator: currentUser, content, media })).unwrap();
      navigate("/"); // fetch posts gets invoked after going to posts List page
    } catch (error) {
      console.log("from CREATE POST submit"); //test
      console.log(error); // test
      setErrorMessage(error); // Local Error state get populated by Redux error
    }
    //}
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      setContent("");
      setMedia("");
    };
  }, []);

  const handleErrorClear = () => {
    dispatch(clearPostError());
    setErrorMessage("");
    setContent("");
    setMedia("");
  };

  return (
    <Box component="form" sx={styles.container} onSubmit={handleSubmit} autoComplete="off">
      <Stack spacing={3} sx={{ alignItems: "center" }}>
        <Typography component="h3" sx={styles.title}>
          ADD NEW POST
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          multiline
          rows={3}
          aria-label="content"
          name="content"
          id="content"
          label="Enter post content"
          type="text"
          required
          InputProps={{
            sx: styles.inputProps,
          }}
          InputLabelProps={{
            sx: styles.inputLabelProps,
          }}
          value={content}
          onChange={handleContentChange}
        />
        <MediaLoader
          onMediaUpload={handleMediaUpload}
          media={media}
          alt={media || ""}
          isLoading={isLoading}
          mediaFormat={mediaFormat}
        />

        <Button
          type="submit"
          disabled={postStatus === "loading"}
          variant="contained"
          sx={styles.button}
          endIcon={
            postStatus === "loading" ? <CircularProgress color="secondary" size={25} /> : undefined
          }
        >
          {postStatus === "loading" ? "POSTING" : "POST"}
        </Button>
      </Stack>
      <ErrorModal
        open={!!errorMessage}
        onClose={handleErrorClear}
        clearModal={handleErrorClear}
        errorMessage={errorMessage}
      />
    </Box>
  );
};

export default NewPost;
