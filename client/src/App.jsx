import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme/theme";
import Header from "./components/shared/header/Header";
import Footer from "./components/shared/footer/Footer";
import PostsList from "./components/posts/postsList/PostsList";
import MyPosts from "./components/posts/myPosts/MyPosts";
import Login from "./components/users/login/Login";
import Signup from "./components/users/signup/Signup";
import UpdateUser from "./components/users/updateUser/UpdateUser";
import PasswordResetEmail from "./components/users/passwordResetEmail/PasswordResetEmail";
import Confirmation from "./components/shared/confirmation/Confirmation";
import PasswordResetForm from "./components/users/passwordResetForm/PasswordResetForm";
import PasswordLinkExpired from "./components/users/passwordLinkExpired/PasswordLinkExpired";
import NewPost from "./components/posts/newPost/NewPost";
import SinglePost from "./components/posts/singlePost/SinglePost";
import EditPost from "./components/posts/editPost/EditPost";
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

  // If Link is live, PasswordResetForm Route is available
  // Otherwise, PasswordLinkExpired Route is available
  let linkIsAvailable;
  // Remaining time till password reset link expires
  let passwordLinkExpiration = JSON.parse(localStorage.getItem("emailTokenData"));

  if (
    passwordLinkExpiration &&
    passwordLinkExpiration.emailTokenExpiration &&
    Number.parseInt(passwordLinkExpiration.emailTokenExpiration) > new Date().getTime()
  ) {
    linkIsAvailable = true;
  } else {
    linkIsAvailable = false;
  }

  // test Start
  useEffect(() => {
    console.log(linkIsAvailable);
  }, [linkIsAvailable]);
  // test End

  // If both variables are present, meaning user is logged in, the countdown to auto logout begins.
  if (userToken && userTokenExpiration) {
    setTimeout(() => {
      dispatch(logout());
    }, remainingTime);
  }

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
        <Route exact path="view/:postId" element={<SinglePost />} />
        {isLoggedIn && <Route path="edit/:postId" element={<EditPost />} />}
        {isLoggedIn && <Route path="myposts" element={<MyPosts />} />}
        {!isLoggedIn && <Route path="login" element={<Login />} />}
        {!isLoggedIn && <Route path="signup" element={<Signup />} />}
        {isLoggedIn && <Route path="updateUser" element={<UpdateUser />} />}
        {isLoggedIn && <Route path="createPost" element={<NewPost />} />}
        <Route path="resetPasswordEmail" element={<PasswordResetEmail />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route
          path="resetPasswordForm"
          element={linkIsAvailable ? <PasswordResetForm /> : <PasswordLinkExpired />}
        />
        <Route path="*" element={<Navigate replace to="" />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
