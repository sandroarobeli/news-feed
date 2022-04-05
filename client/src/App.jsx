import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme/theme";
import Header from "./components/shared/header/Header";
import PostsList from "./components/posts/postsList/PostsList";
import MyPosts from "./components/posts/myPosts/MyPosts";
import Login from "./components/users/login/Login";
import Signup from "./components/users/signup/Signup";
import { selectToken, selectTokenExpiration, logout, autoLogin } from "./redux/user-slice.js";

const App = () => {
  // From Redux
  const dispatch = useDispatch();
  const userToken = useSelector(selectToken);
  const userTokenExpiration = useSelector(selectTokenExpiration);

  // Convenience Boolean for logged in status
  let isLoggedIn = userToken ? true : false;

  // Remaining time till auto logout
  let remainingTime = userTokenExpiration - new Date().getTime();

  // If both variables are present, meaning user is logged in, the countdown to auto logout begins.
  if (userToken && userTokenExpiration) {
    setTimeout(() => {
      dispatch(logout());
    }, remainingTime);
  }
  // console.log("remainingTime"); //test
  // console.log(remainingTime); // test

  // useEffect always runs AFTER the component renders
  // Ensures user stays logged in upon page reload (unless token expired) using localStorage and autoLogin
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    // Making sure besides having a logged in user, the expiration time IS STILL in the future
    if (
      storedData &&
      storedData.token &&
      Number.parseInt(storedData.expiration) > new Date().getTime()
    ) {
      // If so, re-logs the user and KEEPS THE ORIGINAL TIME STAMP INTACT
      dispatch(
        autoLogin({
          userName: storedData.userName,
          userId: storedData.userId,
          userAvatar: storedData.userAvatar,
          posts: storedData.posts,
          token: storedData.token,
          expiration: storedData.expiration,
        })
      );
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="" exact element={<PostsList />} />
        {isLoggedIn && <Route path="myposts" element={<MyPosts />} />}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Navigate replace to="" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
