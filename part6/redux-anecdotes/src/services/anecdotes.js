import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
	const response = await axios.get(baseUrl);
	console.log("response.data: ", response.data);
	return response.data;
};

const get = async (id) => {
	const response = await get(`${baseUrl}/${id}`);
	console.log("response.data: ", response.data);
	return response.data;
};

const createNew = async (content) => {
	const anecdote = {
		content,
		votes: 0,
	};
	const response = await axios.post(baseUrl, anecdote);
	return response.data;
};

const vote = async (id) => {
	const response1 = await axios.get(`${baseUrl}/${id}`);
	const anecdoteToChange = response1.data;
	const changedAnecdote = {
		...anecdoteToChange,
		votes: (anecdoteToChange.votes += 1),
	};
	const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote);
	console.log("response: ", response);
	return response.data;
};

export default { get, getAll, createNew, vote };
