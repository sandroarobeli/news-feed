import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import theme from "../../../theme/theme";
import ErrorModal from "../../shared/errorModal/ErrorModal";
import AvatarInput from "../avatarInput/AvatarInput";
import SnackbarSuccess from "../../shared/snackbarSuccess/SnackbarSuccess";
import {
  update,
  clearError,
  selectToken,
  selectUserStatus,
  selectUserName,
  selectUserAvatar,
} from "../../../redux/user-slice.js";

export const styles = {
  container: {
    textAlign: "center",
    flexGrow: 1,
    margin: "1rem auto auto auto",
    borderRadius: "5px",
    maxWidth: {
      mobile: "90%",
      tablet: "60%",
      laptop: "30%",
    },
    padding: "1rem 1rem 3rem 1rem",
  },
  title: {
    fontSize: theme.typography.h4.fontSize,
    lineHeight: theme.typography.h4.lineHeight,
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
  helperTextProps: {
    color: "#005BBB",
  },
  button: {
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
    "&:disabled": {
      color: theme.palette.secondary.main,
      background: theme.palette.primary.main,
    },
  },
};

const UpdateUser = () => {
  // From Router
  const navigate = useNavigate();

  // from Redux
  const dispatch = useDispatch();
  const userToken = useSelector(selectToken);
  const userStatus = useSelector(selectUserStatus);
  const userNameFromStore = useSelector(selectUserName);
  const userAvatarFromStore = useSelector(selectUserAvatar);

  // Local state
  const [currentUserName, setCurrentUserName] = useState(userNameFromStore);
  const [updatedUserName, setUpdatedUserName] = useState(userNameFromStore);
  const [userAvatar, setUserAvatar] = useState(userAvatarFromStore);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Handler functions
  const handleUserNameChange = (event) => {
    setUpdatedUserName(event.target.value);
  };

  // This picture upload is designed for a single file upload!
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    const typeIsAllowed =
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif";

    try {
      const signedResponse = await fetch("http://127.0.0.1:5000/api/image");
      // console.log(signedResponse); // test
      const signedData = await signedResponse.json();
      // console.log(signedData); // test
      // console.log(file); // test
      const url = "https://api.cloudinary.com/v1_1/" + signedData.cloudName + "/auto/upload";

      if (typeIsAllowed) {
        setIsLoading(true); // test
        formData.append("file", file);
        formData.append("api_key", signedData.apiKey);
        formData.append("timestamp", signedData.timestamp);
        formData.append("signature", signedData.signature);
        formData.append("eager", "c_fill,w_150,h_150"); // c_pad,w_150,h_150
        formData.append("folder", "news-feed");
      }
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const imageResponse = await response.json();
      if (!response.ok) {
        // throw new Error("Attachment failed. Please try again."); // test
        setErrorMessage(imageResponse.error.message); // RESTORE
      }
      //console.log(imageResponse); // test
      // const avatarUrl = imageResponse.secure_url; // Original secure URL
      const avatarUrl = imageResponse.eager[0].secure_url; // URL with stylings
      setUserAvatar(avatarUrl);
      setIsLoading(false);

      // setSuccessBarOpen(true);
    } catch (error) {
      setErrorMessage(error.message); // Local Error state gets populated by Cloudinary error
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(update({ userToken, currentUserName, updatedUserName, userAvatar })).unwrap();
      //setSnackbarOpen(true); // NOT USED NOW. KEEP IT AS A USEFUL FEATURE FOR FUTURE!!!
      // FOR EXAMPLE: WHEN POST IS ADDED OR EDITED ETC. GREAT CONFIRMATION FEATURE!
      navigate("/");
    } catch (error) {
      // NOTE: SINCE ERRORS COULD BE GENERATED FROM EITHER CLOUDINARY OR REDUX,
      // AND THERE IS ONLY ONE ERROR MODULE, REDUX ERROR GOES TO LOCAL ERROR STATE
      // AND ONLY THEN GETS REFLECTED IN ERROR MODULE AS ITS TEXT.

      // For debugging only. error gets populated by createAsyncThunk abstraction
      console.log("from UPDATE submit"); //test
      console.log(error); // test
      setErrorMessage(error); // Local Error state get populated by Redux error
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      setCurrentUserName("");
      setUpdatedUserName("");
      setUserAvatar("");
    };
  }, []);

  const handleErrorClear = () => {
    dispatch(clearError());
    setErrorMessage("");
    setUpdatedUserName("");
    //setPassword("");
    setUserAvatar("");
  };

  return (
    <Box component="form" sx={styles.container} onSubmit={handleSubmit} autoComplete="off">
      <Stack spacing={3} sx={{ alignItems: "center" }}>
        <Typography component="h3" sx={styles.title}>
          UPDATE PROFILE
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          aria-label="newUserName"
          name="newUserName"
          id="newUserName"
          label="New Username"
          type="text"
          required
          InputProps={{
            sx: styles.inputProps,
          }}
          InputLabelProps={{
            sx: styles.inputLabelProps,
          }}
          value={updatedUserName}
          onChange={handleUserNameChange}
        />
        <AvatarInput
          onPictureUpload={handleAvatarUpload}
          userAvatar={userAvatar}
          isLoading={isLoading}
        />
        <Button
          type="submit"
          disabled={userStatus === "loading"}
          variant="contained"
          sx={{ ...styles.button, width: "100%" }}
          endIcon={
            userStatus === "loading" ? <CircularProgress color="secondary" size={25} /> : undefined
          }
        >
          {userStatus === "loading" ? "UPDATING" : "UPDATE"}
        </Button>
      </Stack>
      <ErrorModal
        open={!!errorMessage}
        onClose={handleErrorClear}
        clearModal={handleErrorClear}
        errorMessage={errorMessage}
      />
      <SnackbarSuccess
        open={snackbarOpen}
        message={"Profile update successful!"}
        onClose={() => setSnackbarOpen(false)}
        onClick={() => setSnackbarOpen(false)}
      />
    </Box>
  );
};

export default UpdateUser;
