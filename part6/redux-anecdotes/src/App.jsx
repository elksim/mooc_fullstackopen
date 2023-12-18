import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import anecdotesService from "./services/anecdotes";
import Anecdotes from "./components/Anecdotes";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeAnecdotes());
	}, []);

	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<br />
			<Filter />
			<Anecdotes />
			<AnecdoteForm />
		</div>
	);
};

export default App;
