import { Link } from "react-router-dom";

import { UserContext } from "../UserContext";
import { useContext } from "react";
import { useSetNotification } from "../NotificationContext";

const NavBar = () => {
	const [user, userDispatch] = useContext(UserContext);
	const setNotification = useSetNotification();

	const handleLogout = async (event) => {
		event.preventDefault();
		userDispatch({ type: "logout" });
		setNotification("logged out", "", 2000);
		window.localStorage.removeItem("loggedBloglistUser");
	};

	return (
		<>
			{user !== null ? (
				<>
					<Link to="/blogs/">blogs </Link>
					<Link to="/users/">users </Link>
					{user.username} logged in{" "}
					<button onClick={(event) => handleLogout(event)}>logout</button>
					<br />
					<br />
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default NavBar;
