import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import theme from "../../../theme/theme";

const styles = {
  avatar: {
    margin: "auto",
    border: "2px dashed #005BBB",
    padding: "0.25rem",
    marginBottom: "0.75rem",
    backgroundColor: "#FFFFFF",
    color: theme.palette.primary.main,
    height: "150px",
    width: "150px",
    //height: "auto",
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
  },
};

const AvatarInput = (props) => {
  return (
    <>
      <label htmlFor="userAvatar">
        <input
          id="userAvatar"
          name="userAvatar"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={props.onPictureUpload}
        />
        <Avatar variant="square" alt="User avatar" src={props.userAvatar} sx={styles.avatar} />
        <Button
          type="button"
          sx={styles.button}
          component="span" // Allows button clicking to open the dialog window
          endIcon={
            props.isLoading ? <CircularProgress color="secondary" size={25} /> : <PhotoCameraIcon />
          }
        >
          {props.isLoading ? "loading " : "Upload Avatar"}
        </Button>
      </label>
    </>
  );
};

export default AvatarInput;
