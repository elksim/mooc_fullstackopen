import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	notification: "notifications go here..",
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		changeNotification(state, action) {
			state.notification = action.payload;
		},
		removeNotification(state, action) {
			state.notification = "";
		},
	},
});

export const { changeNotification, removeNotification } =
	notificationSlice.actions;
export default notificationSlice.reducer;

export const setNotification = (notification, duration) => {
	return async (dispatch) => {
		dispatch(changeNotification(notification));
		setTimeout(() => {
			dispatch(changeNotification(null));
		}, duration * 1000);
	};
};
