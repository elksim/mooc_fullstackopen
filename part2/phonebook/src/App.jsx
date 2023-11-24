import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const handleNameChange = (event) => {
		console.log("handling name change..");
		setNewName(event.target.value);
	};

	const addName = (event) => {
		event.preventDefault();
		if (!persons.some((person) => person.name == newName)) {
			setPersons(persons.concat({ name: newName }));
			setNewName("");
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
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map((person) => (
					<div key={person.name}>{person.name}</div>
				))}
			</ul>
		</div>
	);
};

export default App;
