import { Link } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Button } from "@mui/material";

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
					<AppBar position="static">
						<Toolbar>
							<IconButton
								edge="start"
								color="inherit"
								aria-label="menu"
							></IconButton>
							<Button color="inherit">
								<Link to="/blogs/">blogs </Link>
							</Button>
							&nbsp;
							<Button color="inherit">
								<Link to="/users/">users </Link>
							</Button>
							&nbsp;
							<em>{user.username} logged in </em>&nbsp;
							<Button
								type="outlined"
								variant="inherit"
								onClick={(event) => handleLogout(event)}
							>
								logout
							</Button>
							<br />
							<br />
						</Toolbar>
					</AppBar>
					<br />
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default NavBar;
