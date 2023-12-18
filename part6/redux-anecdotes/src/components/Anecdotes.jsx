import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
	const dispatch = useDispatch();

	const handleVote = () => {
		dispatch(voteAnecdote(anecdote.id));
		dispatch(setNotification(`you voted '${anecdote.content}'`, 3));
	};

	return (
		<>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => handleVote()}>vote</button>
			</div>
		</>
	);
};

const Anecdotes = () => {
	const anecdotes = useSelector((state) => {
		let sortedAnecdotes = [...state.anecdotes].sort(
			(a, b) => b.votes - a.votes
		);
		if (state.filter.length !== 0) {
			const filter = state.filter.filter;
			return sortedAnecdotes.filter((anecdote) => {
				return anecdote.content.toLowerCase().includes(filter);
			});
		} else {
			return sortedAnecdotes;
		}
	});
	return (
		<>
			<h2>Anecdotes</h2>
			{anecdotes.map((anecdote) => (
				<Anecdote key={anecdote.id} anecdote={anecdote} />
			))}
		</>
	);
};

export default Anecdotes;
