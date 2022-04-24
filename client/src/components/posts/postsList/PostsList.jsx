import React from "react";
import { useSelector } from "react-redux";

import ListComponent from "../listComponent/ListComponent";

import { selectAllPosts } from "../../../redux/posts-slice";

const PostsList = () => {
  // From Redux
  const posts = useSelector(selectAllPosts);

  return <ListComponent posts={posts} />;
};

export default PostsList;
