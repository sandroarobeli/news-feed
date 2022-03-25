import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme/theme";
import Header from "./components/shared/header/Header";
import PostsList from "./components/posts/postsList/PostsList";
import MyPosts from "./components/posts/myPosts/MyPosts";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="" exact element={<PostsList />} />
        <Route path="myposts" element={<MyPosts />} />
        <Route path="*" element={<Navigate replace to="" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
