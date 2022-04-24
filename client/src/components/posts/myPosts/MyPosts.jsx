import React, { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

import CurrentUser from "../../shared/currentUser/CurrentUser";
import LoadingSpinner from "../../shared/loadingSpinner/LoadingSpinner";
import BlankExcerpt from "../blankExcerpt/BlankExcerpt";
import PostExcerpt from "../postExcerpt/PostExcerpt";
import {
  selectToken,
  selectUserId,
  selectUserName,
  selectUserAvatar,
} from "../../../redux/user-slice.js";
import { selectMyPosts, selectPostStatus } from "../../../redux/posts-slice";

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

const MyPosts = () => {
  // From Redux
  const userToken = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatar);
  const postStatus = useSelector(selectPostStatus);
  const myPosts = useSelector((state) => selectMyPosts(state, userId));

  console.log("My Posts"); // test
  console.log(myPosts); // test

  // Local State
  const [settingsDrawerOpen, setSettingsOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Convenience Boolean for logged in status
  let isLoggedIn = userToken ? true : false;

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

  // Calculate number of empty rows
  const emptyRows = 5 - Math.min(5, myPosts.length - (page - 1) * 5);

  let content;
  if (postStatus === "loading") {
    content = <LoadingSpinner />;
  } else {
    content =
      myPosts.length === 0 ? (
        <BlankExcerpt />
      ) : (
        myPosts
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
        count={Math.ceil(myPosts.length / 5)}
        page={page}
        onChange={handlePageChange}
        sx={styles.pagination}
      />
    </Box>
  );
};

export default MyPosts;
