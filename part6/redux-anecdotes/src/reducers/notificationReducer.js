import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	notification: "notifications go here..",
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification(state, action) {
			state.notification = action.payload;
		},
		removeNotification(state, action) {
			state.notification = "";
		},
	},
});

export const { setNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
