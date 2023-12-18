import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		setAnecdote(state, action) {
			const changedAnecdote = action.payload;
			return state.map((anecdote) => {
				return anecdote.id != changedAnecdote.id
					? anecdote
					: changedAnecdote;
			});
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
		appendAnecdote(state, action) {
			console.log("state", JSON.parse(JSON.stringify(state)));
			console.log("action.payload", action.payload);
			state.push(action.payload);
		},
	},
});

export const { appendAnecdote, setAnecdotes, setAnecdote } =
	anecdoteSlice.actions;
export default anecdoteSlice.reducer;

export const voteAnecdote = (id) => {
	return async (dispatch) => {
		const updatedAnecdote = await anecdoteService.vote(id);
		dispatch(setAnecdote(updatedAnecdote));
	};
};

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(appendAnecdote(newAnecdote));
	};
};
