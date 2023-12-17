import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	notification: "keep up to date with these notifications!",
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification(state, action) {
      console.log('calling setNotification');
			state.notification = action.payload;
		},
		removeNotification(state, action) {
			state.notification = "";
		},
	},
});

export const { setNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
