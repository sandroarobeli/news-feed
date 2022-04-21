import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import PostAuthor from "../postAuthor/PostAuthor";
import TimeStamp from "../timeStamp/TimeStamp";
import { selectUserId } from "../../../redux/user-slice.js";

const styles = {
  container: {
    maxWidth: "80vw",
    minWidth: "275px",
    padding: "0.25rem",
    margin: "1rem auto auto auto",
    // height: "250px", // test
  },
  cardActions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reactions: {
    color: "#000000",
    marginLeft: "0.5rem",
  },
};

const reactionEmoji = {
  thumbsUp: "👍",
  thumbsDown: "👎",
};

const PostExcerpt = (props) => {
  // From Redux
  const loggedUserId = useSelector(selectUserId);

  return (
    <Card sx={styles.container}>
      <CardActionArea component={RouterLink} to={props.toView} aria-label="view single post">
        <CardContent>
          <PostAuthor
            author={props.author}
            authorAvatar={props.authorAvatar}
            quantity={props.quantity}
          />
          <TimeStamp timestamp={props.timestamp} />
          <Typography variant="body1" component="p" color="text">
            {props.content}
          </Typography>
        </CardContent>
        {props.media && (
          <CardMedia component="img" height="150" image={props.media} alt="visual media" />
        )}
      </CardActionArea>
      <CardActions sx={styles.cardActions}>
        <Box>
          <Button onClick={props.onUpvote}>
            {reactionEmoji.thumbsUp}
            <Typography variant="body1" sx={styles.reactions}>
              {props.reactions.thumbsUp}
            </Typography>
          </Button>
          <Button onClick={props.onDownvote}>
            {reactionEmoji.thumbsDown}
            <Typography variant="body1" sx={styles.reactions}>
              {props.reactions.thumbsDown}
            </Typography>
          </Button>
        </Box>
        {loggedUserId === props.authorId && (
          <Box sx={{ marginRight: "2rem" }}>
            <Button component={RouterLink} to={props.toEdit} size="small" color="primary">
              EDIT
            </Button>
            <Button size="small" color="error" onClick={props.onReactionAdded}>
              DELETE
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default PostExcerpt;
