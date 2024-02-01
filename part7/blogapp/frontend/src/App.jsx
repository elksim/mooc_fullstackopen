import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Toggleable from "./components/Toggleable";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

import loginService from "./services/login";

import { NotificationContext, useSetNotification } from "./NotificationContext";
import { useContext, useMutation } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBlogs, addBlog, updateBlog, setToken } from "./requests";

const App = () => {
  const blogFormRef = useRef();

  const setNotification = useSetNotification();

  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);

  const queryClient = useQueryClient();

  const { data: blogs, isPending: blogsIsPending } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => {
      console.log("running blogsQuery");
      return getAllBlogs();
    },
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON !== null) {
      let loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      setToken(loggedUser.token);
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

  // const addBlog = async (blogObject) => {
  //   blogFormRef.current.toggleVisibility();
  //   const returnedBlog = await addBlog(blogObject);
  //   if (!returnedBlog) {
  //     setNotification(`unable to add blog`, "error", 2000);
  //     return;
  //   }
  //   queryClient.invalidateQueries({ queryKey: ["blogs"] });
  //   setNotification(
  //     `added blog ${returnedBlog.title} by ${returnedBlog.author}`,
  //     null,
  //     2000
  //   );
  //   return true;
  // };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService.login({
        username,
        password,
      });
      const data = response.data;
      setUser(response.data);
      setToken(data.token);
      window.localStorage.setItem(
        "loggedBloglistUser",
        JSON.stringify(response.data)
      );
      setUsername("");
      setPassword("");
      setNotification(`logged in as ${response.data.username}`, null, 2000);
    } catch {
      setNotification("invalid credentials.", "error", 2000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    setUser(null);
    setUsername("");
    setPassword("");
    setNotification("logged out", "", 2000);
    window.localStorage.removeItem("loggedBloglistUser");
  };

  const mainElement = () => {
    //displays either the login form or, if a user is logged in already, a list of blogs
    if (user === null) {
      return (
        <>
          <form id="loginForm" onSubmit={handleLogin}>
            username
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <br />
            password
            <input
              id="password"
              value={password}
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
            <br />
            <button type="submit">login</button>
          </form>
        </>
      );
    } else {
      return (
        <>
          {user.username} is logged in.
          <button onClick={(event) => handleLogout(event)}>logout</button>
          <br />
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Toggleable>
          {blogList()}
        </>
      );
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {mainElement()}
    </div>
  );
};

export default App;
