import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import theme from "../../../theme/theme.js";
import SideDrawer from "../sideDrawer/SideDrawer";

const styles = {
  appbar: {
    padding: "0.25rem 0 0.25rem 0",
    [theme.breakpoints.up("tablet")]: {
      padding: "0.5rem 0 0.5rem 0",
    },
  },
  toolbar: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftStack: {
    width: "100vw",
    justifyContent: "space-between",
    [theme.breakpoints.up("tablet")]: {
      width: "auto",
    },
  },
  menuIconButton: {
    display: "block",
    [theme.breakpoints.up("tablet")]: {
      display: "none",
    },
  },
  menuIcon: {
    width: "3rem",
    height: "3rem",
    color: theme.palette.secondary.main,
  },
  logo: {
    color: theme.palette.secondary.main,
    marginLeft: "1rem",
    marginRight: "0.5rem",
    fontSize: theme.typography.h4.fontSize,
    lineHeight: theme.typography.h4.lineHeight,
    fontWeight: "bold",
    fontFamily: "Times New Roman",
  },
  rightStack: {
    display: "none",
    [theme.breakpoints.up("tablet")]: {
      display: "block",
      marginRight: "1rem",
    },
  },
  linkButton: {
    fontFamily: "Segoe UI",
    fontSize: theme.typography.h5.fontSize,
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.background.paper,
      transition: "0.8s",
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

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    //dispatch(logout())
    console.log("Logged out!");
    setDrawerOpen(false);
  };

  return (
    <AppBar position="static" color="primary" sx={styles.appbar}>
      <Toolbar sx={styles.toolbar}>
        <Stack direction="row" sx={styles.leftStack}>
          <IconButton
            onClick={handleDrawerOpen}
            disableRipple
            sx={styles.menuIconButton}
            aria-label="navigation menu icon"
          >
            <MenuIcon sx={styles.menuIcon} />
          </IconButton>
          <IconButton disableRipple component={RouterLink} to="/" aria-label="News Feed logo">
            <Typography component="h2" sx={styles.logo}>
              News Feed
            </Typography>
          </IconButton>
        </Stack>
        <Stack direction="row" sx={styles.rightStack} spacing={{ tablet: 2, laptop: 4 }}>
          <Button
            disableRipple
            component={RouterLink}
            to=""
            sx={styles.linkButton}
            aria-label="main page"
          >
            Main
          </Button>
          <Button
            disableRipple
            component={RouterLink}
            to="myposts"
            sx={styles.linkButton}
            aria-label="my posts page"
          >
            My Posts
          </Button>
          <Button
            disableRipple
            component={RouterLink}
            to=""
            onClick={handleLogout}
            sx={styles.linkButton}
            aria-label="logout button"
          >
            Logout
          </Button>
        </Stack>
        <SideDrawer open={drawerOpen} onDrawerClose={handleDrawerClose} onLogout={handleLogout} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
