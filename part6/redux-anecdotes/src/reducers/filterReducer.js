import { createSlice } from "@reduxjs/toolkit";

const initialState = { filter: "" };

const filterSlice = createSlice({
	name: "filter",
  initialState,
	reducers: {
		filterChange(state, action) {
			const filter = action.payload;
			state.filter = filter;
		},
	},
});

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
