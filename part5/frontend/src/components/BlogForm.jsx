import { useState } from "react";

const BlogForm = ({ createBlog }) => {
	//create Blog state
	const [author, setAuthor] = useState("");
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");

	const addBlog = (event) => {
		event.preventDefault();
		let blogObject = { author: author, title: title, url: url };
		let res = createBlog(blogObject);
		if (res) {
			setAuthor("");
			setTitle("");
			setUrl("");
		}
	};

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={addBlog}>
				title:{"    "}
				<input
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
				<br />
				author:{" "}
				<input
					value={author}
					onChange={({ target }) => setAuthor(target.value)}
				/>
				<br />
				url:{" "}
				<input
					value={url}
					onChange={({ target }) => setUrl(target.value)}
				/>
				<br />
				<button type="submit">submit</button>
			</form>
		</>
	);
};

export default BlogForm;
