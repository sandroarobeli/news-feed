import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import theme from "../../../theme/theme";

const styles = {
  drawer: {
    background: "#FFFFFF",
  },
  stack: {
    width: {
      mobile: "50vw",
      tablet: "25vw",
    },
    marginTop: "25vh",
  },
  editButton: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: "#FFFFFF",
      transition: "0.5s",
      backgroundColor: theme.palette.primary.main,
      borderRadius: 0,
    },
    "&:active": {
      color: "#FFFFFF",
      transition: "0.5s",
      backgroundColor: theme.palette.primary.main,
      borderRadius: 0,
    },
  },
  deleteButton: {
    color: theme.palette.error.main,
    "&:hover": {
      color: "#FFFFFF",
      transition: "0.5s",
      backgroundColor: theme.palette.error.main,
      borderRadius: 0,
    },
    "&:active": {
      color: "#FFFFFF",
      transition: "0.5s",
      backgroundColor: theme.palette.error.main,
      borderRadius: 0,
    },
  },
};

const SettingsDrawer = (props) => {
  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={props.onClose}
      transitionDuration={{ enter: 225, exit: 195 }}
      elevation={16}
      PaperProps={{
        sx: styles.drawer,
      }}
    >
      <Stack direction="column" spacing={7} sx={styles.stack}>
        <Button
          disableRipple
          aria-label="Edit user profile"
          component={RouterLink}
          to="/updateUser"
          onClick={props.onClose}
          sx={styles.editButton}
        >
          EDIT PROFILE
        </Button>
        <Button
          disableRipple
          aria-label="Delete user"
          component={RouterLink}
          to="" // To delete user route
          onClick={props.onClose}
          sx={styles.deleteButton}
        >
          DELETE USER
        </Button>
      </Stack>
    </Drawer>
  );
};

export default SettingsDrawer;
