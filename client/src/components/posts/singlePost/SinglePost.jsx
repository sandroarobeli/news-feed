import React, { useState } from "react";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import BlankExcerpt from "../blankExcerpt/BlankExcerpt";
import ErrorModal from "../../shared/errorModal/ErrorModal";
import DeleteModal from "../../shared/deleteModal/DeleteModal";
import PostAuthor from "../postAuthor/PostAuthor";
import TimeStamp from "../timeStamp/TimeStamp";
import { selectToken, selectUserId } from "../../../redux/user-slice";
import {
  selectPostById,
  selectPostError,
  upvotePost,
  downvotePost,
  clearPostError,
  deletePost,
} from "../../../redux/posts-slice";

const styles = {
  container: {
    maxWidth: "80vw",
    minWidth: "275px",
    padding: "0.25rem",
    margin: "1rem auto auto auto",
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

const SinglePost = () => {
  // From Router
  const postId = useParams().postId;
  const navigate = useNavigate();

  // From Redux
  const dispatch = useDispatch();
  const postById = useSelector((state) => selectPostById(state, postId));
  const userToken = useSelector(selectToken);
  const loggedUserId = useSelector(selectUserId);
  const postError = useSelector(selectPostError);

  // Local state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Handler functions
  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleUpvote = async () => {
    try {
      await dispatch(upvotePost({ postId })).unwrap();
    } catch (error) {
      // For debugging only. error gets populated by createAsyncThunk abstraction
      console.log("from UPVOTE submit"); //test
      console.log(error); // test
    }
  };

  const handleDownvote = async () => {
    try {
      await dispatch(downvotePost({ postId })).unwrap();
    } catch (error) {
      console.log("from DOWNVOTE submit"); //test
      console.log(error); // test
    }
  };

  const handleDeletePost = async () => {
    setDeleteModalOpen(false);
    try {
      await dispatch(deletePost({ userToken, postId })).unwrap();
      navigate("../");
    } catch (error) {
      console.log("from DELETE SINGLE POST submit"); //test
      console.log(error); // test
    }
  };

  const handleErrorClear = () => {
    dispatch(clearPostError());
  };

  if (!postById) {
    return <BlankExcerpt />;
  }
  return (
    <>
      <Card sx={styles.container}>
        <CardActionArea component={RouterLink} to={"/"} aria-label="view single post">
          <CardContent>
            <PostAuthor
              author={postById.creator.userName}
              authorAvatar={postById.creator.userAvatar}
              quantity={postById.creator.posts.length}
            />
            <TimeStamp timestamp={postById.date} />
            <Typography variant="body1" component="p" color="text">
              {postById.content}
            </Typography>
          </CardContent>
          {postById.media && (
            <CardMedia component="img" height="150" image={postById.media} alt="visual media" />
          )}
        </CardActionArea>
        <CardActions sx={styles.cardActions}>
          <Box>
            <Button onClick={handleUpvote}>
              {reactionEmoji.thumbsUp}
              <Typography variant="body1" sx={styles.reactions}>
                {postById.reactions.thumbsUp}
              </Typography>
            </Button>
            <Button onClick={handleDownvote}>
              {reactionEmoji.thumbsDown}
              <Typography variant="body1" sx={styles.reactions}>
                {postById.reactions.thumbsDown}
              </Typography>
            </Button>
          </Box>
          {loggedUserId === postById.creator._id && (
            <Box sx={{ marginRight: "2rem" }}>
              <Button component={RouterLink} to={`/edit/${postId}`} size="small" color="primary">
                EDIT
              </Button>
              <Button size="small" color="error" onClick={handleDeleteModalOpen}>
                DELETE
              </Button>
            </Box>
          )}
        </CardActions>
      </Card>
      <DeleteModal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        cancelDelete={handleDeleteModalClose}
        confirmDelete={handleDeletePost}
      />
      <ErrorModal
        open={!!postError}
        onClose={handleErrorClear}
        clearModal={handleErrorClear}
        errorMessage={postError}
      />
    </>
  );
};

export default SinglePost;
