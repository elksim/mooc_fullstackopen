import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useNotificationDispatch } from "./NotificationContext";

import { getAnecdotes, voteAnecdote } from "./requests";

const App = () => {
	const queryClient = useQueryClient();
	const notificationDispatch = useNotificationDispatch();

	const voteAnecdoteMutation = useMutation({
		mutationFn: voteAnecdote,
		onSuccess: () => {
			queryClient.invalidateQueries(["anecdotes"]);
		},
	});

	const handleVote = (anecdote) => {
		voteAnecdoteMutation.mutate(anecdote);
		notificationDispatch({
			type: "SET",
			payload: `voted ${anecdote.content}`,
		});
		setTimeout(
			() =>
				notificationDispatch({
					type: "REMOVE",
				}),
			5000
		);
	};

	const result = useQuery({
		queryKey: ["anecdotes"],
		queryFn: getAnecdotes,
		retry: 1,
	});

	if (result.isLoading) {
		return <div>loading data...</div>;
	}
	const anecdotes = result.data;

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
