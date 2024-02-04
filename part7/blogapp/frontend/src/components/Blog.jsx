import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";

import { updateBlog, deleteBlog } from "../requests";

import { useSetNotification } from "../NotificationContext";

const Blog = ({ blog, username }) => {
	return (
		<>
			<TableCell>
				<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
			</TableCell>
			<TableCell>{blog.author}</TableCell>
		</>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
};

export default Blog;
