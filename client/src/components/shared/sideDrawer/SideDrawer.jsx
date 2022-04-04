import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import theme from "../../../theme/theme";

export const styles = {
  drawer: {
    background: "rgba(255,255,255,0.5)",
    backdropFilter: "blur(7px)",
  },
  stack: {
    width: "calc(75vw)",
    marginTop: "3rem",
  },
  linkButton: {
    fontFamily: "Segoe UI",
    fontSize: theme.typography.h5.fontSize,
    color: theme.palette.secondary.main,
    //height: "3rem",
    "&:hover": {
      color: theme.palette.background.paper,
      transition: "0.8s",
      backgroundColor: "transparent",
    },
    "&:active": {
      color: theme.palette.background.paper,
      transition: "0.5s",
    },
    "&:focus": {
      color: theme.palette.background.paper,
    },
  },
};

const SideDrawer = (props) => {
  return (
    <Drawer
      anchor="left"
      open={props.open}
      onClose={props.onDrawerClose}
      transitionDuration={{ enter: 225, exit: 195 }}
      elevation={16}
      PaperProps={{
        sx: styles.drawer,
      }}
    >
      <Stack direction="column" spacing={10} sx={styles.stack}>
        <Button
          aria-label="main page"
          disableRipple
          component={RouterLink}
          to=""
          onClick={props.onDrawerClose}
          sx={styles.linkButton}
        >
          Main
        </Button>
        <Button
          aria-label="my posts page"
          disableRipple
          component={RouterLink}
          to="myposts"
          onClick={props.onDrawerClose}
          sx={styles.linkButton}
        >
          My Posts
        </Button>
        <Button
          aria-label="login page"
          disableRipple
          component={RouterLink}
          to="login"
          onClick={props.onDrawerClose}
          sx={styles.linkButton}
        >
          Login
        </Button>
        <Button
          aria-label="signup page"
          disableRipple
          component={RouterLink}
          to="signup"
          onClick={props.onDrawerClose}
          sx={styles.linkButton}
        >
          Signup
        </Button>
        <Button
          aria-label="logout button"
          disableRipple
          component={RouterLink}
          to=""
          onClick={props.onLogout} //{props.onDrawerClose}
          sx={styles.linkButton}
        >
          Logout
        </Button>
      </Stack>
    </Drawer>
  );
};

export default SideDrawer;
