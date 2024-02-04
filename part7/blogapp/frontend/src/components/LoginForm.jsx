import { useState } from "react";
import { TextField, Button } from "@mui/material";
//
import { login } from "../requests";
import { useSetNotification } from "../NotificationContext";
import { useUserDispatch } from "../UserContext";

const LoginForm = () => {
	const setNotification = useSetNotification();
	const userDispatch = useUserDispatch();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const response = await login({
				username,
				password,
			});
			const data = response.data;
			userDispatch({ type: "login", payload: data });
			window.localStorage.setItem(
				"loggedBloglistUser",
				JSON.stringify(response.data)
			);
			setUsername("");
			setPassword("");
			setNotification(`logged in as ${response.data.username}`, null, 2000);
		} catch {
			setNotification("invalid credentials.", "error", 2000);
		}
	};

	return (
		<>
			<form id="loginForm" onSubmit={handleLogin}>
				<TextField
					label="username"
					id="username"
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
				<br />
				<br />
				<TextField
					label="password"
					type="password"
					id="password"
					value={password}
					onChange={({ target }) => {
						setPassword(target.value);
					}}
				/>
				<br />
				<br />
				<Button variant="contained" color="primary" type="submit">
					login
				</Button>
			</form>
		</>
	);
};

export default LoginForm;
