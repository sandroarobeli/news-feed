import React from "react";
import { useSelector } from "react-redux";

import ListComponent from "../listComponent/ListComponent";
import { selectUserId } from "../../../redux/user-slice.js";
import { selectMyPosts } from "../../../redux/posts-slice";

const MyPosts = () => {
  // From Redux
  const userId = useSelector(selectUserId);
  const myPosts = useSelector((state) => selectMyPosts(state, userId));

  return <ListComponent posts={myPosts} />;
};

export default MyPosts;
