import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/login";

const LoginForm = ({
	setUser,
	setUsername,
	setPassword,
	setNotification,
	setNotificationColor,
	username,
	password,
}) => {
	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const response = await loginService.login({
				username,
				password,
			});
			const data = response.data;
			setUser(response.data);
      console.log("setting user to ", response.data);
			blogService.setToken(data.token);
			console.log(
				"setting token with blogService.setToekn to ",
				data.token
			);
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
			(exception) => {
				console.log("exception", exception);
				setNotification("invalid credentials.");
				setNotificationColor("red");
				setTimeout(() => {
					setNotification(null);
					setNotificationColor(null);
				}, 5000);
			};
		}
	};

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
};

export default LoginForm;
