import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllBlogs } from "../requests";

import { useUserValue } from "../UserContext";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Toggleable from "./Toggleable";

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

export default Blogs;
