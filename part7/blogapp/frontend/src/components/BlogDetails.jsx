import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useUserValue } from "../UserContext";
import { useSetNotification } from "../NotificationContext";
import { getBlog, updateBlog, deleteBlog, addComment } from "../requests";

const CommentForm = ({ blogId }) => {
	const [comment, setComment] = useState("");
	const queryClient = useQueryClient();

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (comment.length != 0) {
			await addComment(blogId, comment);
			setComment("");
			queryClient.invalidateQueries({ queryKeys: ["blog"], exact: true });
		}
	};

	return (
		<>
			<form onSubmit={(event) => handleSubmit(event)}>
				<textarea
					value={comment}
					onChange={(event) => setComment(event.target.value)}
				/>
				<br />
				<button type="submit">comment</button>
			</form>
		</>
	);
};

const Comments = ({ comments }) => {
	return (
		<>
			Comments: <br />
			<ul>
				{comments.map((comment) => {
					return <li key={comment.id}>{comment.text}</li>;
				})}
			</ul>
		</>
	);
};

const BlogDetails = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const setNotification = useSetNotification();
	const blogId = useParams().id;
	const userValue = useUserValue();

	const {
		data: blog,
		isPending,
		isError,
		isRefetching,
	} = useQuery({
		queryKey: ["blog"],
		queryFn: () => {
			return getBlog(blogId);
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
			queryClient.invalidateQueries(["blogs"]);
			navigate("/");
		},
		onError: (blog) => {
			setNotification("not authorized to delete this blog", error, 5000);
		},
	});

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

	const handleDelete = (event) => {
		if (window.confirm("are you sure?")) {
			deleteBlogMutation.mutate(blog);
		}
	};

	if (isPending || isRefetching) {
		return <>loading blog...</>;
	}
	if (isError) {
		return <>error retrieving blog.</>;
	}

	return (
		<>
			<h2>
				{blog.title} by {blog.author}
			</h2>
			<p>
				<a href={`//${blog.url}`}>{blog.url}</a> <br />
				{blog.likes} likes
				<button onClick={() => likeBlogMutation.mutate(blog)}>like</button>
				<br />
				added by {blog.user.username}
				<br />
				{blog.user.username === userValue.username ? (
					<button onClick={() => handleDelete()}>delete</button>
				) : (
					<></>
				)}
			</p>
			<br />
			<Comments comments={blog.comments} />
			<CommentForm blogId={blog.id} />
		</>
	);
};
export default BlogDetails;
