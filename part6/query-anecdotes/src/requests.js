import axios from "axios";
const baseUrl = "http://localhost:3002/anecdotes";

export const getAnecdotes = () => {
	return axios.get(baseUrl).then((res) => res.data);
};

export const createAnecdote = (newAnecdote) => {
	return axios.post(baseUrl, newAnecdote).then((res) => res.data);
};

export const voteAnecdote = async (anecdote) => {
	let response = await axios.patch(`${baseUrl}/${anecdote.id}`, {
		votes: anecdote.votes + 1,
	});
};
