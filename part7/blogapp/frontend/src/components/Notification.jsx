import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
	const notification = useNotificationValue();
	console.log("notification: ", notification);

	console.log;
	if (
		notification.message === null ||
		notification.message === undefined ||
		notification.message === ""
	) {
		return <></>;
	}

	const style = {
		borderStyle: "solid",
		borderRadius: "5px",
		background: "lightgrey",
		padding: "10px",
		color: notification.type === "error" ? "red" : "green",
	};

	console.log("style: ", style);
	return (
		<>
			<h3 style={style}>{notification.message}</h3>
		</>
	);
};

export default Notification;
