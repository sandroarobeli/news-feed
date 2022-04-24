/*
MOVE POST-LIST OR MY-POSTS BLOCK HERE AND CHANGE TO...
 content =
      PROPS.posts.length === 0 ? (
        <BlankExcerpt />
      ) : (
        PROPS.posts
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
.......
GOES TO UPPER PARENTS AS ...
const PostList = () => {
  return (
  <ListComponent post={allPosts}/>
  )
}
OR
const MyPosts = () => {
  return (
  <ListComponent post={myPosts}/>
  )
}

*/
