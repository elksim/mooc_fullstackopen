import { useState } from "react";

const Blog = ({ blog, likeBlog }) => {
	const [detailsVisible, setDetailsVisible] = useState(false);

	const showWhenVisible = { display: detailsVisible ? "" : "none" };
	const hideWhenVisible = { display: detailsVisible ? "none" : "" };

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}{" "}
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
			</div>
		</div>
	);
};

export default Blog;
