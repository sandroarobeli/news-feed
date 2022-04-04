import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FilledInput from "@mui/material/FilledInput";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";

// 3. ADD DB AND BACKEND
// 4. TIE TO REDUX
// 5. NOTE: ADD FILE INPUT AS PHOTO INPUT PER HATCHWAYS PROJECT

// NOTE: TIE AUTH TO SERVER FIRST, THEN KNOWING !!!WHAT I NEED!!! MOVE IT TO REDUX

import theme from "../../../theme/theme";
import ErrorModal from "../../shared/errorModal/ErrorModal";
import AvatarInput from "../avatarInput/AvatarInput";

export const styles = {
  container: {
    textAlign: "center",
    flexGrow: 1,
    margin: "1rem auto auto auto",
    border: "2px solid #005BBB",
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
    borderBottom: "3px solid #005BBB",
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
    "&active": {
      color: theme.palette.secondary.main,
      background: theme.palette.primary.light,
    },
  },
};

// Start Redux, first with auth template, then with Joke-Reel
// Once I have all the routes setup, I'll now how to properly name them!

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // test, redux will handle errors

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
      console.log(signedResponse); // test
      const signedData = await signedResponse.json();
      console.log(signedData); // test
      console.log(file); // test
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
        //setErrorBarOpen(true); // RESTORE
      }
      console.log(imageResponse); // test
      // const avatarUrl = imageResponse.secure_url; // Original secure URL
      const avatarUrl = imageResponse.eager[0].secure_url; // URL with stylings
      setUserAvatar(avatarUrl);
      setIsLoading(false);
      // DON'T FORGET NAVIGATE(" TO POSTS LIST") ...
      // setSuccessBarOpen(true);
    } catch (error) {
      //throw new Error(error.message); // test
      setErrorMessage(error.message); // RESTORE
      setIsLoading(false);
      // setErrorBarOpen(true); // RESTORE
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //'Authorization': 'Bearer ' + token
        },
        mode: "cors",
        body: JSON.stringify({
          userName,
          password,
          userAvatar,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        throw new Error(responseData.message);
      }

      console.log("Success response"); // test
      console.log(responseData); // test
    } catch (error) {
      // For debugging only. error gets populated by createAsyncThunk abstraction
      console.log("from SIGNUP submit"); //test
      console.log(error); //test
    }
    // FROM HERE: DB => REDUX => LOCK DOWN ROUTES...
    setUserName("");
    setPassword("");
    setUserAvatar("");
  };

  return (
    <Box component="form" sx={styles.container} onSubmit={handleSubmit} autoComplete="off">
      <Stack spacing={3} sx={{ alignItems: "center" }}>
        <Typography component="h3" sx={styles.title}>
          Sign Up
        </Typography>

        <TextField
          //error
          fullWidth
          variant="filled"
          aria-label="userName"
          name="userName"
          id="userName"
          label="Username"
          type="text"
          required
          //helperText="Incorrect entry." // test
          InputProps={{
            sx: styles.inputProps,
          }}
          InputLabelProps={{
            sx: styles.inputLabelProps,
          }}
          value={userName}
          onChange={handleUserNameChange}
        />

        <TextField
          //error={customHelpText}
          fullWidth
          variant="filled"
          aria-label="password"
          name="password"
          id="password"
          label="Password"
          type="password"
          required
          helperText={password ? "Password must be at least 6 characters long" : undefined}
          InputProps={{
            sx: styles.inputProps,
          }}
          InputLabelProps={{
            sx: styles.inputLabelProps,
          }}
          FormHelperTextProps={{ sx: styles.helperTextProps }}
          value={password}
          onChange={handlePasswordChange}
        />
        <AvatarInput
          onPictureUpload={handleAvatarUpload}
          userAvatar={userAvatar}
          isLoading={isLoading}
        />
        <Button type="submit" variant="contained" sx={{ ...styles.button, width: "100%" }}>
          SUBMIT
        </Button>
      </Stack>
      <ErrorModal
        open={!!errorMessage}
        //onClose={() => setOpenErrorModal(false)}
        //clearModal={() => setOpenErrorModal(false)}
        errorMessage={errorMessage}
      />
    </Box>
  );
};

export default Signup;
