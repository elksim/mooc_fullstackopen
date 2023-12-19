import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const notificationDispatch = useNotificationDispatch();

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
		},
		onError: (invalidAnecdote) => {
			notificationDispatch({
				type: "SET",
				payload: "too short anecdote, must have length of 5 or more.",
			});
			setTimeout(() => {
				notificationDispatch({
					type: "REMOVE",
				});
			}, 5000);
		},
	});

	const onCreate = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		newAnecdoteMutation.mutate({ content, votes: 0 });
		notificationDispatch({
			type: "SET",
			payload: `added anecdote ${content}`,
		});
		setTimeout(
			() =>
				notificationDispatch({
					type: "REMOVE",
				}),
			5000
		);
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
