import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    marginBottom: "0.5rem",
  },
  avatar: {
    width: "2rem",
    height: "2rem",
    marginRight: "1rem",
  },
  author: {
    fontStyle: "italic",
  },
};

const PostAuthor = (props) => {
  return (
    <Box sx={styles.container}>
      <Avatar alt={props.author} src={props.authorAvatar} sx={styles.avatar} />
      <Typography variant="body2" sx={styles.author}>
        {"by "} {props.author ? props.author : "Unknown Author"}{" "}
        {
          <Typography component={RouterLink} variant="body2" to="#">
            {`${props.quantity} ${props.quantity === 1 ? "post" : "posts"}`}
          </Typography>
        }
      </Typography>
    </Box>
  );
};

export default PostAuthor;
