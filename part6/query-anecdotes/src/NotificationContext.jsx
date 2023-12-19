import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SET":
			return action.payload;
		case "REMOVE":
			return null;
		default:
			return state;
	}
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		null
	);

	return (
		<NotificationContext.Provider
			value={[notification, notificationDispatch]}
		>
			{props.children}
		</NotificationContext.Provider>
	);
};

export default NotificationContext;


export const useNotificationValue = () => {
	const [notification, _notificationDispatch] =
		useContext(NotificationContext);
	return notification;
};

export const useNotificationDispatch = () => {
	const [_notification, notificationDispatch] =
		useContext(NotificationContext);
	return notificationDispatch;
};
