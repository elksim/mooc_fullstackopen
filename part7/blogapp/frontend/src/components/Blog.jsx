import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { updateBlog, deleteBlog } from "../requests";

import { useSetNotification } from "../NotificationContext";

const Blog = ({ blog, username }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<div style={blogStyle} className="blog">
			<Link to={`/blogs/${blog.id}`}>
				{blog.title} - {blog.author}
			</Link>
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
};

export default Blog;
