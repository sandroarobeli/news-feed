import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
});

// Exports reducer functions
export const {} = postsSlice.actions;

// Exports individual selectors
//export const selectAllPosts = (state) => state.posts.posts
//export const selectPostError = (state) => state.posts.error
//export const selectPostStatus = (state) => state.posts.status

export default postsSlice.reducer;
