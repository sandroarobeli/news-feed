import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "user/signup",
  // rejectWithValue ENABLES CUSTOM ERROR MESSAGING
  async (initialUser, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //'Authorization': 'Bearer ' + token
        },
        mode: "cors",
        body: JSON.stringify({
          userName: initialUser.userName,
          password: initialUser.password,
          userAvatar: initialUser.userAvatar,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        return rejectWithValue(responseData.message);
      }

      return responseData.user;
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log("from signup thunk catch"); //test
      console.log(error.message); //test
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  // rejectWithValue ENABLES CUSTOM ERROR MESSAGING
  async (initialUser, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          userName: initialUser.userName,
          password: initialUser.password,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        return rejectWithValue(responseData.message);
      }

      return responseData.user;
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log("from login thunk catch"); //test
      console.log(error.message); //test
      return rejectWithValue(error.message);
    }
  }
);

export const update = createAsyncThunk(
  "user/update",
  // rejectWithValue ENABLES CUSTOM ERROR MESSAGING
  async (initialUser, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/user/update", {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + initialUser.userToken,
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          currentUserName: initialUser.currentUserName,
          updatedUserName: initialUser.updatedUserName,
          userAvatar: initialUser.userAvatar,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        return rejectWithValue(responseData.message);
      }

      return responseData.user;
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log("from update thunk catch"); //test
      console.log(error.message); //test
      return rejectWithValue(error.message);
    }
  }
);

export const passwordResetEmail = createAsyncThunk(
  "user/passwordResetEmail",
  // rejectWithValue ENABLES CUSTOM ERROR MESSAGING
  async (initialUser, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/user/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          email: initialUser.email,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        return rejectWithValue(responseData.message);
      }

      return responseData.user;
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log("from password reset email thunk catch"); //test
      console.log(error.message); //test
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (initialUser, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/user/passwordReset", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          userName: initialUser.userName,
          newPassword: initialUser.newPassword,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        return rejectWithValue(responseData.message);
      }

      return responseData.user;
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log("from actual password reset thunk catch"); //test
      console.log(error.message); //test
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      userName: "",
      userId: "",
      userAvatar: "",
      posts: [],
      token: "",
      tokenExpiration: null,
    },
    status: "idle",
    error: null,
  },
  reducers: {
    // Restores logged in status upon page reload. Arguments come from Local Storage
    autoLogin: (state, action) => {
      state.user.userName = action.payload.userName;
      state.user.userId = action.payload.userId;
      state.user.userAvatar = action.payload.userAvatar;
      state.user.posts = action.payload.posts;
      state.user.token = action.payload.token;
      // AutoLogin (Caused by page reload) KEEPS THE ORIGINAL TIME STAMP INTACT
      state.user.tokenExpiration = Number.parseInt(action.payload.expiration);
    },
    logout: (state, action) => {
      state.user.userName = "";
      state.user.userId = "";
      state.user.userAvatar = "";
      state.user.posts = [];
      state.user.token = "";
      state.user.tokenExpiration = null;
      state.status = "idle"; // so login button becomes clickable again
      localStorage.removeItem("userData");
    },
    // Sets state.status to 'idle' again so login button becomes clickable again
    clearError: (state, action) => {
      // state.error = "" RESTORE IF NEEDED
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("final payload received from Controllers:"); // test
        console.log(action.payload); // test
        state.user.userName = action.payload.userName;
        state.user.userId = action.payload.userId;
        state.user.userAvatar = action.payload.userAvatar;
        state.user.posts = action.payload.posts;
        state.user.token = action.payload.token;
        // NOTE: DATE CLASS OR ANY RANDOM VALUE GENERATOR DOESN'T BELONG IN REDUCERS
        // Original Signup STARTS THE FULL 1 HOUR
        //state.user.tokenExpiration = new Date().getTime() + 1000 * 60 * 60;
        state.user.tokenExpiration = action.payload.expiration;
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userName: action.payload.userName,
            userId: action.payload.userId,
            userAvatar: action.payload.userAvatar,
            posts: action.payload.posts,
            token: action.payload.token,
            expiration: state.user.tokenExpiration.toString(),
          })
        );
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        console.log("action.payload"); //test
        console.log(action.payload); // ALLOWS CUSTOM MESSAGING
        console.log("action.error"); //test
        console.log(action.error.message); // ALLOWS PRE SET STANDARD MESSAGING
        state.error = action.payload; // CUSTOM
        //state.error = action.error.message; // STANDARD-PRESET
      })
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("final payload received from controllers"); // test
        console.log(action.payload); // test
        state.user.userName = action.payload.userName;
        state.user.userId = action.payload.userId;
        state.user.userAvatar = action.payload.userAvatar;
        state.user.posts = action.payload.posts;
        state.user.token = action.payload.token;
        // First, response data gets assigned to state...
        state.user.tokenExpiration = action.payload.expiration;
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userName: action.payload.userName,
            userId: action.payload.userId,
            userAvatar: action.payload.userAvatar,
            posts: action.payload.posts,
            token: action.payload.token,
            // Then, state gets assigned to Local Storage...
            expiration: state.user.tokenExpiration.toString(),
          })
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        console.log("action.payload"); //test
        console.log(action.payload); //test  ALLOWS CUSTOM MESSAGING
        console.log("action.error"); //test
        console.log(action.error.message); // test ALLOWS PRE SET STANDARD MESSAGING
        state.error = action.payload; // CUSTOM
        //state.error = action.error.message// STANDARD-PRESET
      })
      .addCase(update.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(update.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("final payload received from Controllers:"); // test
        console.log(action.payload); // test
        // Only userName & userAvatar get possibly updated by update controller
        // Every other property is outside of the scope and STAYS THE SAME
        state.user.userName = action.payload.userName;
        // state.user.userId = action.payload.userId;
        state.user.userAvatar = action.payload.userAvatar;
        // state.user.posts = action.payload.posts;
        // state.user.token = action.payload.token;
        // state.user.tokenExpiration = action.payload.expiration;
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userName: action.payload.userName,
            userId: state.user.userId,
            userAvatar: action.payload.userAvatar,
            posts: state.user.posts,
            token: state.user.token,
            expiration: state.user.tokenExpiration.toString(),
          })
        );
        state.status = "idle"; // RESTORE IF NEEDED
      })
      .addCase(update.rejected, (state, action) => {
        state.status = "failed";
        console.log("action.payload"); //test
        console.log(action.payload); //test  ALLOWS CUSTOM MESSAGING
        console.log("action.error"); //test
        console.log(action.error.message); // test ALLOWS PRE SET STANDARD MESSAGING
        state.error = action.payload; // CUSTOM
        //state.error = action.error.message// STANDARD-PRESET
      })
      .addCase(passwordResetEmail.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(passwordResetEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("final payload received from Controllers:"); // test
        console.log(action.payload); // test
        // This time I store reset token in Local Store
        localStorage.setItem(
          "emailTokenData",
          JSON.stringify({
            emailTokenExpiration: action.payload.emailTokenExpiration,
          })
        );
        state.status = "idle";
      })
      .addCase(passwordResetEmail.rejected, (state, action) => {
        state.status = "failed";
        console.log("action.payload"); //test
        console.log(action.payload); //test  ALLOWS CUSTOM MESSAGING
        console.log("action.error"); //test
        console.log(action.error.message); // test ALLOWS PRE SET STANDARD MESSAGING
        state.error = action.payload; // CUSTOM
        //state.error = action.error.message// STANDARD-PRESET
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        // No need to reflect anything in state. Actual login doesn't happen here
        console.log("final payload received from Controllers:"); // test
        console.log(action.payload); // test
        // Resetting state status to idle allows us to proceed with login
        // Once the password has been successfully reset
        state.status = "idle";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        console.log("action.payload"); //test
        console.log(action.payload); //test  ALLOWS CUSTOM MESSAGING
        console.log("action.error"); //test
        console.log(action.error.message); // test ALLOWS PRE SET STANDARD MESSAGING
        state.error = action.payload; // CUSTOM
        //state.error = action.error.message// STANDARD-PRESET
      });
  },
});

// Exports reducer functions
// export const {autoLogin, logout, clearError } = userSlice.actions
export const { clearError, logout, autoLogin } = userSlice.actions;

// Exports individual selectors
export const selectUserName = (state) => state.user.user.userName;
export const selectUserId = (state) => state.user.user.userId;
export const selectUserAvatar = (state) => state.user.user.userAvatar;
// export const selectUserPosts = (state) => state.user.user.posts
export const selectToken = (state) => state.user.user.token;
export const selectTokenExpiration = (state) => state.user.user.tokenExpiration;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
