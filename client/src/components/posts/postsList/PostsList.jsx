import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";

import CurrentUser from "../../shared/currentUser/CurrentUser";
import ErrorModal from "../../shared/errorModal/ErrorModal";
import LoadingSpinner from "../../shared/loadingSpinner/LoadingSpinner";
import BlankExcerpt from "../blankExcerpt/BlankExcerpt";
import PostExcerpt from "../postExcerpt/PostExcerpt";
import { selectToken, selectUserName, selectUserAvatar } from "../../../redux/user-slice";
import {
  selectAllPosts,
  clearPostError,
  selectPostStatus,
  listAllPosts,
  upvotePost,
  downvotePost,
} from "../../../redux/posts-slice";

const styles = {
  container: {
    border: "1px solid red",
    margin: "0 auto 2rem auto",
  },
};

const PostsList = () => {
  // From Redux
  const dispatch = useDispatch();
  const userToken = useSelector(selectToken);
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatar);
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(selectPostStatus);

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
  }, [dispatch, postStatus]);

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

  return (
    <Box component="section" sx={styles.container}>
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

export default PostsList;
