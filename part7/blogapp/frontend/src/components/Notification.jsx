import { useNotificationValue } from "../NotificationContext";

import { Alert } from "@mui/material";

const Notification = () => {
	const notification = useNotificationValue();
	console.log;
	if (
		notification.message === null ||
		notification.message === undefined ||
		notification.message === ""
	) {
		return <></>;
	}
	return (
		<>
			<Alert severity={notification.type !== "error" ? "success" : "error"}>
				{notification.message}
			</Alert>
		</>
	);
};

export default Notification;
