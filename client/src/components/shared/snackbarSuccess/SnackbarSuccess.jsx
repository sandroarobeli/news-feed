import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

const styles = {
  snackbar: {
    backgroundColor: "green",
    fontWeight: "bold",
    maxWidth: {
      mobile: "90%",
      tablet: "70%",
      laptop: "50%",
    },
    margin: "auto",
  },
  icon: {
    color: "white",
  },
};
const SnackbarSuccess = (props) => {
  return (
    <Snackbar
      open={props.open}
      onClose={props.onClose}
      message={props.message}
      autoHideDuration={2000}
      action={
        <>
          <Button sx={styles.icon} size="small" onClick={props.onClick}>
            <CloseIcon color="secondary" />
          </Button>
        </>
      }
      ContentProps={{
        sx: styles.snackbar,
      }}
    />
  );
};

export default SnackbarSuccess;
