import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBlog, deleteBlog } from "../requests";

import { useSetNotification } from "../NotificationContext";

const Blog = ({ blog, username }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const setNotification = useSetNotification();
  const queryClient = useQueryClient();

  const showWhenVisible = { display: detailsVisible ? "" : "none" };
  const hideWhenVisible = { display: detailsVisible ? "none" : "" };

  const deleteVisible = {
    display: blog.user.username === username ? "" : "none",
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const likeBlogMutation = useMutation({
    mutationFn: (blog) => {
      let newBlog = {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1,
      };
      return updateBlog(newBlog);
    },
    onSuccess: (likedBlog) => {
      setNotification(
        `liked blog ${likedBlog.title} by ${likedBlog.author}`,
        null,
        1000
      );
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: () => {
      setNotification(`error liking blog`, "error", 1000);
    },
  });

  const deleteBlogMutation = useMutation({
    // why does this mutation Fn require async await but likeBlogMutations mutationFn doesn't???
    mutationFn: async (blog) => {
      await deleteBlog(blog);
      return blog;
    },
    onSuccess: (blog) => {
      queryClient.invalidateQueries(["blogs"]);
      setNotification(
        `deleted blog ${blog.title} by ${blog.author}`,
        null,
        2000
      );
    },
    onError: (blog) => {
      setNotification("not authorized to delete this blog", error, 5000);
    },
  });

  return (
    <div style={blogStyle} className="blog">
      {blog.title} - {blog.author}{" "}
      <span style={hideWhenVisible}>
        <button
          onClick={() => {
            setDetailsVisible(true);
          }}
        >
          view
        </button>
      </span>
      <span style={showWhenVisible}>
        <button
          onClick={() => {
            setDetailsVisible(false);
          }}
        >
          hide
        </button>
      </span>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes <span id="likeCount">{blog.likes}</span>{" "}
        <button
          id="like"
          onClick={() => {
            likeBlogMutation.mutate(blog);
          }}
        >
          like
        </button>
        <br />
        {blog.user.username}
        <br />
        <div style={deleteVisible}>
          <button
            onClick={() => {
              deleteBlogMutation.mutate(blog);
            }}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};

export default Blog;
