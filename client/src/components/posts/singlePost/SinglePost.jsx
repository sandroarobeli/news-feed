import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PostExcerpt from "../postExcerpt/PostExcerpt";
import ErrorModal from "../../shared/errorModal/ErrorModal";
import {
  selectPostById,
  upvotePost,
  downvotePost,
  clearPostError,
} from "../../../redux/posts-slice";

const SinglePost = () => {
  // From Router
  const postId = useParams().postId;

  // From Redux
  const dispatch = useDispatch();
  const postById = useSelector((state) => selectPostById(state, postId));

  // Local state
  const [errorMessage, setErrorMessage] = useState("");

  // Handler functions
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
      console.log("from DOWNVOTE submit"); //test
      console.log(error); // test
      setErrorMessage(error);
    }
  };

  const handleErrorClear = () => {
    dispatch(clearPostError());
    setErrorMessage("");
  };

  return (
    <>
      <PostExcerpt
        key={postById._id}
        toView={`view/${postById._id}`}
        toEdit={`edit/${postById._id}`}
        author={postById.creator.userName}
        authorId={postById.creator._id}
        authorAvatar={postById.creator.userAvatar}
        quantity={postById.creator.posts.length}
        timestamp={postById.date}
        content={postById.content}
        media={postById.media}
        reactions={postById.reactions}
        onUpvote={() => handleUpvote(postId)}
        onDownvote={() => handleDownvote(postId)}
      />
      <ErrorModal
        open={!!errorMessage}
        onClose={handleErrorClear}
        clearModal={handleErrorClear}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default SinglePost;
