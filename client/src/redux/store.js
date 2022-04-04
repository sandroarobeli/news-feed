import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    //posts: postsReducer
  },
});

export default store;
