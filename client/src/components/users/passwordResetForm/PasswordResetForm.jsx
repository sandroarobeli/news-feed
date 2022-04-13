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
import SnackbarSuccess from "../../shared/snackbarSuccess/SnackbarSuccess";
import { resetPassword, clearError, selectUserStatus } from "../../../redux/user-slice.js";

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

const PasswordResetForm = () => {
  // From Router
  const navigate = useNavigate();

  // from Redux
  const dispatch = useDispatch();
  const userStatus = useSelector(selectUserStatus);

  // Local state
  const [userName, setUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Handler functions
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(resetPassword({ userName, newPassword })).unwrap();
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/login");
      }, 2100);
    } catch (error) {
      // For debugging only. error gets populated by createAsyncThunk abstraction
      console.log("from UPDATE submit"); //test
      console.log(error); // test
      setErrorMessage(error); // Local Error state get populated by Redux error
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      setUserName("");
      setNewPassword("");
    };
  }, []);

  const handleErrorClear = () => {
    dispatch(clearError());
    setErrorMessage("");
    setUserName("");
    setNewPassword("");
  };

  return (
    <Box component="form" sx={styles.container} onSubmit={handleSubmit} autoComplete="off">
      <Stack spacing={3} sx={{ alignItems: "center" }}>
        <Typography component="h3" sx={styles.title}>
          PASSWORD RESET
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          aria-label="userName"
          name="userName"
          id="userName"
          label="Username"
          type="text"
          required
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
          fullWidth
          variant="filled"
          aria-label="new password"
          name="newPassword"
          id="newPassword"
          label="New Password"
          type="password"
          required
          helperText={
            newPassword && newPassword.length < 6
              ? "Password must be at least 6 characters long"
              : undefined
          }
          InputProps={{
            sx: styles.inputProps,
          }}
          InputLabelProps={{
            sx: styles.inputLabelProps,
          }}
          FormHelperTextProps={{ sx: styles.helperTextProps }}
          value={newPassword}
          onChange={handleNewPasswordChange}
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
          {userStatus === "loading" ? "RESETTING" : "RESET"}
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
        message={"Password update successful!"}
        onClose={() => setSnackbarOpen(false)}
        onClick={() => setSnackbarOpen(false)}
      />
    </Box>
  );
};

export default PasswordResetForm;
