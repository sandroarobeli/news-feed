import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import theme from "../../../theme/theme";

const styles = {
  container: {
    width: "100%",
  },
  button: {
    width: "100%",
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

const MediaLoader = (props) => {
  return (
    <Card component="label" htmlFor="media" sx={styles.container}>
      <input
        id="media"
        name="media"
        type="file"
        accept="*"
        style={{ display: "none" }}
        onChange={props.onMediaUpload}
      />
      <CardMedia component={props.mediaFormat} height="150" image={props.media} alt={props.alt} />
      <CardActions>
        <Button
          type="button"
          component="span"
          sx={styles.button}
          endIcon={
            props.isLoading ? <CircularProgress color="secondary" size={25} /> : <PhotoCameraIcon />
          }
        >
          {props.isLoading ? "loading " : "Upload Media"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MediaLoader;
