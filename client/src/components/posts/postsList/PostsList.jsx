import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
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
    margin: "0 auto 0 auto",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    margin: "2rem auto 5rem auto",
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
  const [page, setPage] = useState(1);

  // Convenience Boolean for logged in status
  let isLoggedIn = userToken ? true : false;

  // Populating/Updating posts
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(listAllPosts());
    }
  }, [dispatch, postStatus]);

  // Handling functions
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleSettingsDrawerOpen = () => {
    setSettingsOpen(true);
  };
  const handleSettingsDrawerClose = () => {
    setSettingsOpen(false);
  };

  const handleErrorClear = () => {
    dispatch(clearPostError());
  };

  // Calculate number of empty rows
  const emptyRows = 5 - Math.min(5, posts.length - (page - 1) * 5);

  let content;
  if (postStatus === "loading") {
    content = <LoadingSpinner />;
  } else {
    content =
      posts.length === 0 ? (
        <BlankExcerpt />
      ) : (
        posts
          .slice((page - 1) * 5, (page - 1) * 5 + 5)
          .map((post) => (
            <PostExcerpt
              key={post._id}
              postId={post._id}
              author={post.creator.userName}
              authorId={post.creator._id}
              authorAvatar={post.creator.userAvatar}
              quantity={post.creator.posts.length}
              timestamp={post.date}
              content={`${post.content.substring(0, 100)} ${
                post.content.length > 100 ? "..." : " "
              }`}
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
      {emptyRows > 0 && <BlankExcerpt sx={{ height: `calc(100vh - 100vh/${emptyRows})` }} />}
      <Pagination
        variant="outlined"
        color="primary"
        count={Math.ceil(posts.length / 5)}
        page={page}
        onChange={handlePageChange}
        sx={styles.pagination}
      />
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
