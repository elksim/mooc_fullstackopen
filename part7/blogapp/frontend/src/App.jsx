import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";

import Toggleable from "./components/Toggleable";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

import { useSetNotification } from "./NotificationContext";
import { UserContext } from "./UserContext";

import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "./requests";

const App = () => {
  const blogFormRef = useRef();

  const setNotification = useSetNotification();
  const [user, userDispatch] = useContext(UserContext);

  const { data: blogs, isPending: blogsIsPending } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => {
      return getAllBlogs();
    },
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON !== null) {
      let loggedUser = JSON.parse(loggedUserJSON);
      userDispatch(loggedUser);
    }
  }, []);

  if (blogsIsPending) {
    return "blogs is loading...";
  }

  const blogList = () => {
    return (
      <div>
        <br />
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} username={user.username} />
          ))}
        <br />
      </div>
    );
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    userDispatch({ type: "logout" });
    setNotification("logged out", "", 2000);
    window.localStorage.removeItem("loggedBloglistUser");
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          {user.username} is logged in.
          <button onClick={(event) => handleLogout(event)}>logout</button>
          <br />
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Toggleable>
          {blogList()}
        </>
      )}
    </div>
  );
};

export default App;
