import Anecdote from "./components/Anecdotes";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
	return (
		<div>
			<h2>Anecdotes</h2>
			<Anecdote />
			<AnecdoteForm />
		</div>
	);
};

export default App;
