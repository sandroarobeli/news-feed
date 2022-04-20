import React from "react";
import { Link as RouterLink } from "react-router-dom";
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

const styles = {};

const reactionEmoji = {
  thumbsUp: "👍",
  thumbsDown: "👎",
};

const PostExcerpt = (props) => {
  return (
    <Card
      // key={props.key}
      sx={{
        maxWidth: "80vw",
        minWidth: "275px",
        padding: "0.25rem",
        margin: "1rem auto auto auto",
        // height: "250px", // test
      }}
    >
      <CardActionArea component={RouterLink} to={props.to} aria-label="view single post">
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
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button onClick={props.onUpvote}>
            {reactionEmoji.thumbsUp}
            <Typography
              variant="body1"
              sx={{
                color: "#000000",
                marginLeft: "0.5rem",
              }}
            >
              {props.reactions.thumbsUp}
            </Typography>
          </Button>
          <Button onClick={props.onDownvote}>
            {reactionEmoji.thumbsDown}
            <Typography
              variant="body1"
              sx={{
                color: "#000000",
                marginLeft: "0.5rem",
              }}
            >
              {props.reactions.thumbsDown}
            </Typography>
          </Button>
        </Box>
        <Box sx={{ marginRight: "2rem" }}>
          <Button component={RouterLink} to="#" size="small" color="primary">
            EDIT
          </Button>
          <Button size="small" color="error" onClick={props.onReactionAdded}>
            DELETE
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostExcerpt;
