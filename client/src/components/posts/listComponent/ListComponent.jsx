import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

import CurrentUser from "../../shared/currentUser/CurrentUser";
import ErrorModal from "../../shared/errorModal/ErrorModal";
import LoadingSpinner from "../../shared/loadingSpinner/LoadingSpinner";
import BlankExcerpt from "../blankExcerpt/BlankExcerpt";
import PostExcerpt from "../postExcerpt/PostExcerpt";
import DeleteModal from "../../shared/deleteModal/DeleteModal";

import {
  selectToken,
  selectUserName,
  selectUserAvatar,
  selectUserId,
  deleteUser,
  logout,
} from "../../../redux/user-slice";
import {
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

const ListComponent = (props) => {
  // From Redux
  const dispatch = useDispatch();
  const userToken = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatar);
  const postStatus = useSelector(selectPostStatus);
  const postError = useSelector(selectPostError);

  // Local State
  const [settingsDrawerOpen, setSettingsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Convenience Boolean for logged in status
  let isLoggedIn = userToken ? true : false;

  // Populating/Updating posts
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(listAllPosts());
    }
  }, [dispatch, postStatus, props.posts]);

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
  const emptyRows = 5 - Math.min(5, props.posts.length - (page - 1) * 5);

  let content;
  if (postStatus === "loading") {
    content = <LoadingSpinner />;
  } else {
    content =
      props.posts.length === 0 ? (
        <BlankExcerpt />
      ) : (
        props.posts
          .slice((page - 1) * 5, (page - 1) * 5 + 5)
          .map((post) => (
            <PostExcerpt
              key={post._id}
              postId={post._id}
              author={post.creator.userName}
              authorId={post.creator._id}
              authorAvatar={post.creator.userAvatar}
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
        count={Math.ceil(props.posts.length / 5)}
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

export default ListComponent;
