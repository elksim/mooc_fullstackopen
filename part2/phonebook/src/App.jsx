import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const addName = (event) => {
		event.preventDefault();
		if (!persons.some((person) => person.name == newName)) {
			setPersons(persons.concat({ name: newName, number: newNumber }));
			setNewName("");
			setNewNumber("");
		} else {
			window.alert(`${newName} is already in the phonebook.`);
		}
	};

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	return (
		<div>
			<h1>Phonebook</h1>
			filter shown with <input onChange={handleFilterChange} />
			<h2> add a new </h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number:{" "}
					<input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons
				.filter((person) =>
					person.name.toLowerCase().startsWith(filter)
				)
				.map((person) => (
					<div key={person.name}>
						{person.name} {person.number}
					</div>
				))}
			debug: {filter}
		</div>
	);
};

export default App;
