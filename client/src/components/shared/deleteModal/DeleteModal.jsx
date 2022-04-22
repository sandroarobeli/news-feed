import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const styles = {
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
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingBottom: "1rem",
  },
  cancelButton: {
    color: "#FF3333",
    backgroundColor: "#FFFFFF",
    "&:hover": {
      color: "#FFFFFF",
      backgroundColor: "#FF3333",
    },
    "&:active": {
      color: "#FFFFFF",
      backgroundColor: "#FF3333",
    },
  },
  deleteButton: {
    color: "#FFFFFF",
    backgroundColor: "#FF3333",
    "&:hover": {
      color: "#FF3333",
      backgroundColor: "#FFFFFF",
    },
    "&:active": {
      color: "#FF3333",
      backgroundColor: "#FFFFFF",
    },
  },
};

const DeleteModal = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      transitionDuration={{ enter: 500, exit: 100 }}
      scroll="body"
      sx={styles.dialog}
    >
      <DialogTitle onClose={props.onClose} sx={styles.dialogTitle}>
        Are you sure?
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        Do you want to proceed anyway? Note that deletion will be permanent
      </DialogContent>
      <DialogActions sx={styles.dialogActions}>
        <Button
          size="small"
          variant="contained"
          onClick={props.cancelDelete}
          sx={styles.cancelButton}
        >
          CANCEL
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={props.confirmDelete}
          sx={styles.deleteButton}
        >
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
