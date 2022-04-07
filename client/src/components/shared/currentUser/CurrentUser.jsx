import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import SettingsIcon from "@mui/icons-material/Settings";

import theme from "../../../theme/theme";
import SettingsDrawer from "../settingsDrawer/SettingsDrawer";

const styles = {
  toolbar: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    border: `2px solid ${theme.palette.primary.main}`,
    width: "2.75rem",
    height: "2.75rem",
  },
  user: {
    fontStyle: "italic",
    color: theme.palette.primary.main,
  },
  button: {
    color: "#FFFFFF",
    background: theme.palette.primary.light,
  },
};

const CurrentUser = (props) => {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar sx={styles.toolbar}>
        <Stack direction="row" spacing={2}>
          <Avatar alt={props.userName} src={props.userAvatar} sx={styles.avatar} />
          <Typography variant="h6" component="h4" sx={styles.user}>
            {props.userName}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={{ mobile: 2, tablet: 3, laptop: 4 }}>
          <IconButton
            disableRipple
            component={RouterLink}
            to="" // to Create a POST
            sx={styles.button}
            aria-label="Create a post"
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            disableRipple
            sx={styles.button}
            onClick={props.onClick}
            aria-label="User settings"
          >
            <SettingsIcon />
          </IconButton>
        </Stack>
        <SettingsDrawer open={props.open} onClose={props.onClose} />
      </Toolbar>
    </AppBar>
  );
};

export default CurrentUser;
