import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

//import { styles } from "./styles";

export const styles = {
  dialog: {
    margin: "auto",
    width: {
      mobile: "95%",
      tablet: "80%",
      laptop: "65%",
    },
  },
  dialogTitle: {
    background: "#FF3333",
    color: "white",
    fontWeight: 600,
    padding: {
      tablet: "1rem 0.5rem",
    },
  },
  dialogContent: {
    backgroundColor: "white",
    textAlign: "center",
    margin: "1rem auto",
  },
  dialogActions: {
    justifyContent: "center",
    backgroundColor: "white",
    paddingBottom: "1rem",
  },
  dialogButton: {
    color: "#FFFFFF",
    backgroundColor: "#FF3333",
    "&:hover": {
      color: "#FF3333",
      backgroundColor: "#FFFFFF",
    },
  },
};

const ErrorModal = (props) => {
  return (
    <Dialog
      //fullWidth
      open={props.open}
      onClose={props.onClose}
      transitionDuration={{ enter: 500, exit: 100 }}
      scroll="body"
      sx={styles.dialog}
    >
      <DialogTitle onClose={props.onClose} sx={styles.dialogTitle}>
        An Error Occurred
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>{props.errorMessage}</DialogContent>
      <DialogActions sx={styles.dialogActions}>
        <Button variant="contained" onClick={props.clearModal} sx={styles.dialogButton}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
