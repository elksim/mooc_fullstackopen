import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useQueryClient, useMutation } from "@tanstack/react-query";
//
import { useSetNotification } from "../NotificationContext";
import { addBlog } from "../requests";
//

const BlogForm = () => {
	const [author, setAuthor] = useState("");
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");

	const queryClient = useQueryClient();

	const setNotification = useSetNotification();

	const addBlogMutation = useMutation({
		mutationFn: async (blogObject) => {
			let response = await addBlog(blogObject);
			return response;
		},
		onSuccess: (returnedBlog) => {
			setNotification(
				`added blog ${returnedBlog.title} by ${returnedBlog.author}`,
				null,
				2000
			);
			queryClient.invalidateQueries({ queryKey: ["blogs"] });
			setAuthor("");
			setTitle("");
			setUrl("");
		},
		onError: () => {
			setNotification(
				`unable to add blog - title must be >4 characters.`,
				"error",
				2000
			);
		},
	});
	const handleAddBlog = (event) => {
		event.preventDefault();
		addBlogMutation.mutate({ author, title, url });
	};

	return (
		<>
			<h3>create new</h3>
			<form onSubmit={handleAddBlog}>
				<TextField
					label="title"
					id="title"
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
				<br />
				<br />
				<TextField
					label="author"
					id="author"
					value={author}
					onChange={({ target }) => setAuthor(target.value)}
				/>
				<br />
				<br />
				<TextField
					label="url"
					id="url"
					value={url}
					onChange={({ target }) => setUrl(target.value)}
				/>
				<br />
				<Button variant="contained" type="submit">
					submit
				</Button>
			</form>
		</>
	);
};

export default BlogForm;
