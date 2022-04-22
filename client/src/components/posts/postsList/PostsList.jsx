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
  selectPostError,
  listAllPosts,
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
  const postError = useSelector(selectPostError);

  console.log("posts"); // test
  console.log(posts); // test

  // Local State
  const [settingsDrawerOpen, setSettingsOpen] = useState(false);

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

  const handleErrorClear = () => {
    dispatch(clearPostError());
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
            postId={post._id}
            author={post.creator.userName}
            authorId={post.creator._id}
            authorAvatar={post.creator.userAvatar}
            quantity={post.creator.posts.length}
            timestamp={post.date}
            content={`${post.content.substring(0, 100)} ${post.content.length > 100 ? "..." : " "}`}
            media={post.media}
            reactions={post.reactions}
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
        open={!!postError}
        onClose={handleErrorClear}
        clearModal={handleErrorClear}
        errorMessage={postError}
      />
    </Box>
  );
};

export default PostsList;
