import { useState, useEffect } from "react";
import axios from "axios";

import Blog from "./components/Blog";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	// const [notification, setNotification] = useState({
	// 	message: "initial notification",
	// 	color: "red",
	// });
	const [notification, setNotification] = useState(null);
	const [notificationColor, setNotificationColor] = useState("");
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState([]);
	const [password, setPassword] = useState([]);
	const [user, setUser] = useState(null);
	//create Blog state
	const [author, setAuthor] = useState("");
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON =
			window.localStorage.getItem("loggedBloglistUser");
		if (loggedUserJSON !== null) {
			let loggedUser = JSON.parse(loggedUserJSON);
			setUser(loggedUser);
			blogService.setToken(loggedUser.token);
		}
	}, []);

	const createBlogForm = () => {
		return (
			<>
				<form onSubmit={handleCreateBlog}>
					author:{" "}
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
					<br />
					title:{" "}
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
					<br />
					url:{" "}
					<input onChange={({ target }) => setUrl(target.value)} />
					<br />
					<button type="submit">submit</button>
				</form>
			</>
		);
	};

	const blogList = () => {
		return (
			<>
				<br />
				{blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} />
				))}
				<br />
			</>
		);
	};

	const mainElement = () => {
		//displays either the loginForm or, if a user is logged in already, a list of blogs
		if (user === null) {
			return (
				<>
					<form onSubmit={handleLogin}>
						username
						<input
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
						<br />
						password
						<input
							value={password}
							onChange={({ target }) => {
								setPassword(target.value);
							}}
						/>
						<br />
						<button type="submit">login</button>
					</form>
				</>
			);
		} else {
			return (
				<>
					{user.username} is logged in.
					<button onClick={(event) => handleLogout(event)}>
						logout
					</button>
					{createBlogForm()}
					{blogList()}
				</>
			);
		}
	};

	const handleCreateBlog = async (event) => {
		event.preventDefault();
		const response = await blogService.createBlog({ title, author, url });

		if (response.status == 201) {
			setBlogs(blogs.concat(response.data));
			const { title, author, url } = response.data;
			setNotification(`a new blog ${title} by ${author} added`);
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const response = await loginService.login({
				username,
				password,
			});
			const data = response.data;
			setUser(response.data);
			blogService.setToken(data.token);
			window.localStorage.setItem(
				"loggedBloglistUser",
				JSON.stringify(response.data)
			);
			setUsername("");
			setPassword("");
			setNotification(`logged in as ${response.data.username}`);
			setNotificationColor("green");
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		} catch {
			setNotification("invalid credentials.");
			setNotificationColor("red");
			setTimeout(() => {
				setNotification(null);
				setNotificationColor(null);
			}, 5000);
		}
	};

	const handleLogout = async (event) => {
		event.preventDefault();
		setUser(null);
		setUsername("");
		setPassword("");
		setNotification("logged out.");
		setNotificationColor("green");
		setTimeout(() => {
			setNotification(null);
		}, 5000);
		window.localStorage.removeItem("loggedBloglistUser");
	};

	return (
		<div>
			<Notification message={notification} color={notificationColor} />
			{mainElement()}
			DEBUG: <br />
			username: {username}
			<br />
			password: {password}
			<br />
			user: {user !== null ? user.username : null}
			<br />
			notification: {notification}
			<br />
		</div>
	);
};

export default App;
