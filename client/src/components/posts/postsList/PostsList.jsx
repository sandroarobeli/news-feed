import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import theme from "../../../theme/theme";
import CurrentUser from "../../shared/currentUser/CurrentUser";
import PostAuthor from "../postAuthor/PostAuthor";
import TimeStamp from "../timeStamp/TimeStamp";
import ErrorModal from "../../shared/errorModal/ErrorModal";
import LoadingSpinner from "../../shared/loadingSpinner/LoadingSpinner";
import BlankExcerpt from "../blankExcerpt/BlankExcerpt";
import PostExcerpt from "../postExcerpt/PostExcerpt";
import {
  selectToken,
  selectUserName,
  selectUserAvatar,
  selectUserStatus,
} from "../../../redux/user-slice";
import {
  selectAllPosts,
  selectPostError,
  clearPostError,
  selectPostStatus,
  listAllPosts,
  upvotePost,
  downvotePost,
} from "../../../redux/posts-slice";
const styles = {};

const PostsList = () => {
  // From Redux
  const dispatch = useDispatch();
  const userToken = useSelector(selectToken);
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatar);
  const userStatus = useSelector(selectUserStatus);
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(selectPostStatus);
  const postError = useSelector(selectPostError);

  console.log("posts"); // test
  console.log(posts); // test

  // Local State
  const [settingsDrawerOpen, setSettingsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Convenience Boolean for logged in status
  let isLoggedIn = userToken ? true : false;

  // Populating/Updating posts
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(listAllPosts());
    }
  }, [dispatch, postStatus]); // postStatus, dispatch, userStatus

  // Handling functions
  const handleSettingsDrawerOpen = () => {
    setSettingsOpen(true);
  };
  const handleSettingsDrawerClose = () => {
    setSettingsOpen(false);
  };

  const handleUpvote = async (postId) => {
    try {
      await dispatch(upvotePost({ postId })).unwrap();
    } catch (error) {
      // For debugging only. error gets populated by createAsyncThunk abstraction
      console.log("from UPVOTE submit"); //test
      console.log(error); // test
      setErrorMessage(error); // Local Error state get populated by Redux error
    }
  };

  const handleDownvote = async (postId) => {
    try {
      await dispatch(downvotePost({ postId })).unwrap();
    } catch (error) {
      // For debugging only. error gets populated by createAsyncThunk abstraction
      console.log("from DOWNVOTE submit"); //test
      console.log(error); // test
      setErrorMessage(error); // Local Error state get populated by Redux error
    }
  };

  const handleErrorClear = () => {
    dispatch(clearPostError());
    setErrorMessage("");
  };

  let content;
  if (postStatus === "loading") {
    content = <LoadingSpinner />;
  } else {
    content =
      posts.length === 0 ? (
        <BlankExcerpt />
      ) : (
        posts.map((post) => (
          <PostExcerpt
            key={post._id}
            to={`view/${post._id}`}
            author={post.creator.userName}
            authorAvatar={post.creator.userAvatar}
            quantity={post.creator.posts.length}
            timestamp={post.date}
            content={`${post.content.substring(0, 100)} ${post.content.length > 100 ? "..." : " "}`} // + post.content.length > 100 && "..."
            media={post.media}
            reactions={post.reactions}
            onUpvote={() => handleUpvote(post._id)}
            onDownvote={() => handleDownvote(post._id)}
          />
        ))
      );
  }

  // 2. CONTINUE FOLLOWING THE REDUX TUTORIAL...
  // CONTINUE CLICKABLE ==> TAKES YOU TO VIEW, PLUS BUTTONS (EDIT, DELETE)
  // ARE NOT CLICKABLE. AS PER MUI CARD DESIGNS...
  // console.log(posts); // test
  return (
    <Box
      component="section"
      sx={{
        border: "1px solid red", // test
        margin: "0 auto 2rem auto",
      }}
    >
      {isLoggedIn && (
        <CurrentUser
          userName={userName}
          userAvatar={userAvatar}
          onClick={handleSettingsDrawerOpen}
          open={settingsDrawerOpen}
          onClose={handleSettingsDrawerClose}
        />
      )}
      {content}
      <ErrorModal
        open={!!errorMessage}
        onClose={handleErrorClear}
        clearModal={handleErrorClear}
        errorMessage={errorMessage}
      />
    </Box>
  );
};
// open={drawerOpen} onDrawerClose={handleDrawerClose}
export default PostsList;
