import { useState, useEffect } from "react";
import axios from "axios";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

// const LoginForm = (props) => {
// 	let { handleLogin, username, setUsername, password, setPassword } = props;
// 	return (
// 		<>
// 			<form onSubmit={handleLogin}>
// 				username
// 				<input
// 					value={username}
// 					onChange={({ target }) => setUsername(target.value)}
// 				/>
// 				<br />
// 				password
// 				<input
// 					value={password}
// 					onChange={({ target }) => {
// 						setPassword(target.value);
// 					}}
// 				/>
// 				<br />
// 				<button type="submit">login</button>
// 			</form>
// 		</>
// 	);
// };

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState([]);
	const [password, setPassword] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

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
					{user.username} is logged in. <br />
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
					<br />
				</>
			);
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
			console.log("data: ", data);
			setUser(response.data);
			blogService.setToken(data.token);
		} catch {
			console.log("incorrect credentials");
		}
	};

	return (
		<div>
			{mainElement()}
			DEBUG: <br />
			username: {username}
			<br />
			password: {password}
			<br />
			user: {user !== null ? user.username : null}
			<br />
		</div>
	);
};

export default App;
