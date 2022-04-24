import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import theme from "../../../theme/theme";

const styles = {
  navigation: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: theme.palette.secondary.main,
    "&.Mui-selected": {
      color: "#FFFFFF",
    },
    "&:active": {
      color: theme.palette.background.paper,
      transition: "0.8s",
    },
  },
};

const Footer = () => {
  // Local state
  const [value, setValue] = useState("reference1");

  // Handler functions
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={styles.navigation} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Reference1"
        value="reference1"
        disableRipple
        icon={<RestoreIcon />}
        sx={styles.icon}
        //showLabel
      />
      <BottomNavigationAction
        label="Reference2"
        value="reference2"
        disableRipple
        icon={<FavoriteIcon />}
        sx={styles.icon}
      />
      <BottomNavigationAction
        label="Reference3"
        value="reference3"
        disableRipple
        icon={<LocationOnIcon />}
        sx={styles.icon}
      />
    </BottomNavigation>
  );
};

export default Footer;
