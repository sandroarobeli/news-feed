import React, { useState } from "react";
import { useSelector } from "react-redux";

import CurrentUser from "../../shared/currentUser/CurrentUser";
import { selectToken, selectUserName, selectUserAvatar } from "../../../redux/user-slice.js";

const MyPosts = () => {
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
      <h2>My Posts are displayed here</h2>
    </>
  );
};

export default MyPosts;
