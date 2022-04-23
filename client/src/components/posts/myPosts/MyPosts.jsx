import React, { useState } from "react";
import { useSelector } from "react-redux";

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

  // Convenience Boolean for logged in status
  let isLoggedIn = userToken ? true : false;

  // Handling functions
  const handleSettingsDrawerOpen = () => {
    setSettingsOpen(true);
  };
  const handleSettingsDrawerClose = () => {
    setSettingsOpen(false);
  };

  let content;
  if (postStatus === "loading") {
    content = <LoadingSpinner />;
  } else {
    content =
      myPosts.length === 0 ? (
        <BlankExcerpt />
      ) : (
        myPosts.map((post) => (
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
    <>
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
    </>
  );
};

export default MyPosts;
