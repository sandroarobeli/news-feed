import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import theme from "../../../theme/theme";
import ErrorModal from "../../shared/errorModal/ErrorModal";
import { selectToken } from "../../../redux/user-slice";
import {
  selectPostById,
  clearPostError,
  selectPostStatus,
  editPost,
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

const EditPost = () => {
  // From Router
  const postId = useParams().postId;
  const navigate = useNavigate();

  // From Redux
  const dispatch = useDispatch();
  const postById = useSelector((state) => selectPostById(state, postId));
  const postStatus = useSelector(selectPostStatus);
  const userToken = useSelector(selectToken);

  // Local state
  const [errorMessage, setErrorMessage] = useState("");
  const [content, setContent] = useState(postById.content);

  // Handler functions
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(editPost({ userToken, postId, content })).unwrap();
      navigate("/"); // fetch posts gets invoked after going to posts List page
    } catch (error) {
      console.log("from EDIT POST submit"); //test
      console.log(error); // test
      setErrorMessage(error); // Local Error state get populated by Redux error
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      setContent("");
    };
  }, []);

  const handleErrorClear = () => {
    dispatch(clearPostError());
    setErrorMessage("");
    setContent(postById.content);
  };

  return (
    <Box component="form" sx={styles.container} onSubmit={handleSubmit} autoComplete="off">
      <Stack spacing={3} sx={{ alignItems: "center" }}>
        <Typography component="h3" sx={styles.title}>
          EDIT POST CONTENT
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

        <Button
          type="submit"
          disabled={postStatus === "loading"}
          variant="contained"
          sx={styles.button}
          endIcon={
            postStatus === "loading" ? <CircularProgress color="secondary" size={25} /> : undefined
          }
        >
          {postStatus === "loading" ? "UPDATING" : " UPDATE"}
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

export default EditPost;
