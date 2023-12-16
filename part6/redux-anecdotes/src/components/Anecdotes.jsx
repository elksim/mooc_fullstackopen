import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote }) => {
	const dispatch = useDispatch();
	return (
		<>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => dispatch(voteAnecdote(anecdote.id))}>
					vote
				</button>
			</div>
		</>
	);
};

const Anecdotes = () => {
	const anecdotes = useSelector((state) =>
		[...state].sort((a, b) => b.votes - a.votes)
	);
	
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
