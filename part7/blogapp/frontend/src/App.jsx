import { useState, useContext, useEffect } from "react";
import { Route, Routes, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import User from "./components/User";
import Blogs from "./components/Blogs";
import BlogDetails from "./components/BlogDetails";
import NavBar from "./components/NavBar";

import { useSetNotification } from "./NotificationContext";
import { UserContext } from "./UserContext";

import { getAllBlogs, getAllUsers, getUser } from "./requests";

// const Common = (props) => {
// 	return (
// 		<>
// 			<div>
// 				{user === null ? (
// 					<LogilnForm />
// 				) : (
// 					<>
// 						{user.username} is logged in.
// 						<br />
// 						<button onClick={(event) => handleLogout(event)}>logout</button>
// 						<br />
// 						{props.children}
// 					</>
// 				)}
// 			</div>
// 		</>
// 	);
// };

const Users = () => {
	const { data: allUsers, isPending } = useQuery({
		queryKey: ["users"],
		queryFn: getAllUsers,
	});
	if (isPending) {
		return <>users loading...</>;
	}
	return (
		<table>
			<tbody>
				{allUsers.map((user) => {
					return (
						<tr key={user.id}>
							<td>
								<Link to={user.id}>{user.username}</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

const App = () => {
	const setNotification = useSetNotification();
	const [user, userDispatch] = useContext(UserContext);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
		if (loggedUserJSON !== null) {
			let loggedUser = JSON.parse(loggedUserJSON);
			setNotification(`welcome back ${loggedUser.username}`, "", 2000);
			userDispatch({ type: "login", payload: loggedUser });
		}
	}, []);

	return (
		<>
			<h2>blogs</h2>
			<Notification />
			<NavBar />
			{user === null ? (
				<LoginForm />
			) : (
				<>
					<Routes basename="/">
						<Route exact path="/" element={<Blogs />} />
						<Route exact path="/blogs/" element={<Blogs />} />
						<Route exact path="users/:id" element={<User />} />
						<Route exact path="users/" element={<Users />} />
						<Route exact path="blogs/:id" element={<BlogDetails />} />
					</Routes>
				</>
			)}
		</>
	);
};

export default App;
