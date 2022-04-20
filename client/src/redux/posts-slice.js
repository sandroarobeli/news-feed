import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Lists all existing posts
export const listAllPosts = createAsyncThunk(
  "posts/listAllPosts",
  async (initialPost, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });
      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        return rejectWithValue(responseData.message);
      }
      return responseData.posts;
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log("from create thunk catch"); //test
      console.log(error.message); //test
      return rejectWithValue(error.message);
    }
  }
);

// Adds new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  // rejectWithValue ENABLES CUSTOM ERROR MESSAGING
  async (initialPost, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/post/create", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + initialPost.userToken,
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          content: initialPost.content,
          media: initialPost.media,
          creator: initialPost.creator,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        return rejectWithValue(responseData.message);
      }

      return responseData.post;
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log("from create thunk catch"); //test
      console.log(error.message); //test
      return rejectWithValue(error.message);
    }
  }
);

// Upvotes a Post
export const upvotePost = createAsyncThunk(
  "posts/upvotePost",
  async (initialPost, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/post/upvote", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          postId: initialPost.postId,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        return rejectWithValue(responseData.message);
      }

      return responseData.post._id;
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log("from create thunk catch"); //test
      console.log(error.message); //test
      return rejectWithValue(error.message);
    }
  }
);

// Downvotes a Post
export const downvotePost = createAsyncThunk(
  "posts/downvotePost",
  async (initialPost, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/post/downvote", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          postId: initialPost.postId,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        return rejectWithValue(responseData.message);
      }

      return responseData.post._id;
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log("from create thunk catch"); //test
      console.log(error.message); //test
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Sets state.status to 'idle' again so login button becomes clickable again
    clearPostError: (state, action) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded"; // RESTORE IF NEEDED

        console.log(action.payload); // test
        state.posts.push(action.payload);
        // state.status = "idle"; // RESTORE IF NEEDED
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        console.log("action.payload"); //test
        console.log(action.payload); // ALLOWS CUSTOM MESSAGING
        console.log("action.error"); //test
        console.log(action.error.message); // ALLOWS PRE SET STANDARD MESSAGING
        state.error = action.payload; // CUSTOM
        //state.error = action.error.message; // STANDARD-PRESET
      })
      .addCase(listAllPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(listAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded"; // RESTORE IF NEEDED
        //state.status = "idle"; // test
        // console.log(action.payload); // test
        state.posts = state.posts.concat(action.payload);
        //state.status = "idle"; // ENABLING THIS CAUSES INFINITE LOOP.
      })
      .addCase(listAllPosts.rejected, (state, action) => {
        state.status = "failed";
        console.log("action.payload"); //test
        console.log(action.payload); // ALLOWS CUSTOM MESSAGING
        console.log("action.error"); //test
        console.log(action.error.message); // ALLOWS PRE SET STANDARD MESSAGING
        state.error = action.payload; // CUSTOM
        //state.error = action.error.message; // STANDARD-PRESET
      })
      .addCase(upvotePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(upvotePost.fulfilled, (state, action) => {
        state.status = "success";
        const postId = action.payload;
        console.log("postId received"); // test
        console.log(action.payload); // test
        console.log(postId); // test
        const existingPost = state.posts.find((post) => post._id === postId);
        if (existingPost) {
          existingPost.reactions.thumbsUp++;
        }
      })
      .addCase(upvotePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(downvotePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(downvotePost.fulfilled, (state, action) => {
        state.status = "success";
        const postId = action.payload;

        const existingPost = state.posts.find((post) => post._id === postId);
        if (existingPost) {
          existingPost.reactions.thumbsDown++;
        }
      })
      .addCase(downvotePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Exports reducer functions
export const { clearPostError } = postsSlice.actions;

// Exports individual selectors
export const selectAllPosts = (state) =>
  state.posts.posts.slice().sort((a, b) => b.date.localeCompare(a.date));
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post._id === postId);
export const selectPostError = (state) => state.posts.error;
export const selectPostStatus = (state) => state.posts.status;

export default postsSlice.reducer;
