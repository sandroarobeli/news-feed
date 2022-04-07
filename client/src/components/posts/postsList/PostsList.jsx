import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import SettingsIcon from "@mui/icons-material/Settings";

import theme from "../../../theme/theme";
import CurrentUser from "../../shared/currentUser/CurrentUser";
import { selectToken, selectUserName, selectUserAvatar } from "../../../redux/user-slice.js";

const styles = {};

const PostsList = () => {
  // From Redux
  const userToken = useSelector(selectToken);
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatar);

  // Local State
  const [settingsDrawerOpen, setSettingsOpen] = useState(false);

  // Convenience Boolean for logged in status
  let isLoggedIn = userToken ? true : false;

  // Handling functions
  const handleSettingsDrawerOpen = () => {
    setSettingsOpen(true);
  };
  const handleSettingsDrawerClose = () => {
    setSettingsOpen(false);
  };

  return (
    <>
      {isLoggedIn && (
        <CurrentUser
          userName={userName}
          userAvatar={userAvatar}
          onClick={handleSettingsDrawerOpen}
          open={settingsDrawerOpen}
          onClose={handleSettingsDrawerClose}
        />
      )}
      <h2>This is Posts List Page</h2>
    </>
  );
};
// open={drawerOpen} onDrawerClose={handleDrawerClose}
export default PostsList;
