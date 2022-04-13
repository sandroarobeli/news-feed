import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import theme from "../../../theme/theme";

const styles = {
  container: {
    textAlign: "center",
    flexGrow: 1,
    margin: "1rem auto auto auto",
    maxWidth: "90%",
    padding: "1rem 1rem 3rem 1rem",
  },
  title: {
    fontSize: theme.typography.h5.fontSize,
    lineHeight: theme.typography.h5.lineHeight,
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginBottom: "3rem",
  },
  button: {
    padding: "0.5rem",
    fontSize: "1rem",
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

const PasswordLinkExpired = () => {
  return (
    <Box component="form" sx={styles.container}>
      <Stack spacing={3} sx={{ alignItems: "center" }}>
        <Typography component="h5" sx={styles.title}>
          This link has expired. Please resubmit your email and follow the link within the next 15
          minutes
        </Typography>
        <Button
          type="button"
          variant="contained"
          component={RouterLink}
          to="/resetPasswordEmail"
          aria-label="return back"
          sx={styles.button}
        >
          BACK TO POSTS
        </Button>
      </Stack>
    </Box>
  );
};

export default PasswordLinkExpired;
