import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, likeBlog, username, deleteBlog }) => {
	const [detailsVisible, setDetailsVisible] = useState(false);

	const showWhenVisible = { display: detailsVisible ? "" : "none" };
	const hideWhenVisible = { display: detailsVisible ? "none" : "" };

	// console.log("username ", username);
	// console.log("blog", blog);
	const deleteVisible = {
		display: blog.user.username === username ? "" : "none",
	};

	const handleDeleteBlog = (blog) => {
		if (window.confirm(`delete ${blog.title} by ${blog.author}`)) {
			deleteBlog(blog);
		}
	};

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<div style={blogStyle}>
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
				likes {blog.likes}{" "}
				<button
					onClick={() => {
						likeBlog(blog);
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
							handleDeleteBlog(blog);
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
	likeBlog: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
