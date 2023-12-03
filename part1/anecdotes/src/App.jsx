import { useState } from "react";

const App = () => {
	const anecdotes = [
		"Good code is its own best documentation. As you’re about to add a comment, ask yourself, ‘How can I improve the code so that this comment isn’t needed?’ Improve the code and then document it to make it even clearer.",
		"Plan to throw one (implementation) away; you will, anyhow.",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Before software can be reusable it first has to be usable.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"If something is worth doing once, it's worth building a tool to do it.",
	];

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

	const randomIndex = () => {
		let result = Math.floor(Math.random() * anecdotes.length);
		return result;
	};

	const Vote = (index) => {
		let new_votes = [...votes];
		new_votes[index] += 1;
		setVotes(new_votes);
	};

	let mostVoted = votes.findIndex((v) => v === Math.max(...votes));

	return (
		<>
			{console.log("votes are now ", votes)}
			<h2> anecdote of the day</h2>
			<p>{anecdotes[selected]}</p>
			<p>has {votes[selected]} votes</p>
			<button onClick={() => Vote(selected)}>vote</button>
			<button onClick={() => setSelected(randomIndex())}>
				next anecdote
			</button>
			<h2>Anecdote with the most votes</h2>
			<p>{anecdotes[mostVoted]}</p>
			<p>has {votes[mostVoted]} votes</p>
		</>
	);
};

export default App;
