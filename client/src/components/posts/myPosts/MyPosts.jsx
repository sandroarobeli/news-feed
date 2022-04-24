import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

import CurrentUser from "../../shared/currentUser/CurrentUser";
import LoadingSpinner from "../../shared/loadingSpinner/LoadingSpinner";
import BlankExcerpt from "../blankExcerpt/BlankExcerpt";
import PostExcerpt from "../postExcerpt/PostExcerpt";
import ErrorModal from "../../shared/errorModal/ErrorModal";
import DeleteModal from "../../shared/deleteModal/DeleteModal";
import {
  selectToken,
  selectUserId,
  selectUserName,
  selectUserAvatar,
  logout,
  deleteUser,
} from "../../../redux/user-slice.js";
import {
  selectMyPosts,
  selectPostStatus,
  selectPostError,
  clearPostError,
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

const MyPosts = () => {
  // From Redux
  const dispatch = useDispatch();
  const userToken = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatar);
  const postStatus = useSelector(selectPostStatus);
  const postError = useSelector(selectPostError);
  const myPosts = useSelector((state) => selectMyPosts(state, userId));

  console.log("My Posts"); // test
  console.log(myPosts); // test

  // Local State
  const [settingsDrawerOpen, setSettingsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Convenience Boolean for logged in status
  let isLoggedIn = userToken ? true : false;

  // Handling functions
  const handleDeleteModalOpen = () => {
    setSettingsOpen(false);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSettingsDrawerOpen = () => {
    setSettingsOpen(true);
  };
  const handleSettingsDrawerClose = () => {
    setSettingsOpen(false);
  };

  const handleDeleteUser = async () => {
    setDeleteModalOpen(false);
    try {
      await dispatch(deleteUser({ userToken, userId })).unwrap();
      dispatch(logout());
      dispatch(clearPostError()); // Forces STATUS to 'idle', thus refreshes array
    } catch (error) {
      console.log("from DELETE USER submit"); //test
      console.log(error); // test
    }
  };
  const handleErrorClear = () => {
    dispatch(clearPostError());
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
          onDeleteUser={handleDeleteModalOpen}
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
      <ErrorModal
        open={!!postError}
        onClose={handleErrorClear}
        clearModal={handleErrorClear}
        errorMessage={postError}
      />
      <DeleteModal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        cancelDelete={handleDeleteModalClose}
        confirmDelete={handleDeleteUser}
      />
    </Box>
  );
};

export default MyPosts;
