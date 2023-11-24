import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "0412345678" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

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

	return (
		<div>
			<h2>Phonebook</h2>
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
			<ul>
				{persons.map((person) => (
					<div key={person.name}>
						{person.name} {person.number}
					</div>
				))}
			</ul>
		</div>
	);
};

export default App;
