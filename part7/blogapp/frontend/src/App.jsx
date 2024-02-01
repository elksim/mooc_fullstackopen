import { useState, useContext, useEffect, useRef } from "react";
import { Route, Routes, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import Toggleable from "./components/Toggleable";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

import { useSetNotification } from "./NotificationContext";
import { UserContext, useUserValue } from "./UserContext";

import { getAllBlogs, getAllUsers, getUser } from "./requests";

const Blogs = () => {
  const blogFormRef = useRef();
  const user = useUserValue();

  const { data: blogs, isPending: blogsIsPending } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => {
      return getAllBlogs();
    },
  });

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

  return (
    <>
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Toggleable>
      {blogList()}
    </>
  );
};

const Common = (props) => {
  console.log("props: ", props);
  const setNotification = useSetNotification();
  const [user, userDispatch] = useContext(UserContext);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON !== null) {
      let loggedUser = JSON.parse(loggedUserJSON);
      userDispatch({ type: "login", payload: loggedUser });
    }
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    userDispatch({ type: "logout" });
    setNotification("logged out", "", 2000);
    window.localStorage.removeItem("loggedBloglistUser");
  };

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user === null ? (
          <LoginForm />
        ) : (
          <>
            {user.username} is logged in.
            <br />
            <button onClick={(event) => handleLogout(event)}>logout</button>
            <br />
            {props.children}
          </>
        )}
      </div>
    </>
  );
};

const Users = () => {
  const { data: allUsers, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  if (isPending) {
    return <>users loading...</>;
  }
  console.log("allUsers: ", allUsers);
  return (
    <table>
      {allUsers.map((user) => {
        return (
          <tr key={user.id}>
            <Link to={user.id}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </Link>
          </tr>
        );
      })}
    </table>
  );
};

const UserDetails = () => {
  const id = useParams().id;
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUser(id);
    },
  });
  if (isError) {
    return <>that user does not exist.</>;
  }
  if (isPending) {
    return <>user loading...</>;
  }
  console.log("user: ", user);
  return (
    <>
      username: {user.username}
      <br />
      <h6>all blogs</h6>
      <table>
        <tbody>
          {user.blogs.map((blog) => {
            return (
              <tr key={blog.id}>
                <td>{blog.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  return (
    <>
      <Common>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="users/:id" element={<UserDetails />} />
          <Route path="users/" element={<Users />} />
        </Routes>
      </Common>
    </>
  );
};

export default App;
