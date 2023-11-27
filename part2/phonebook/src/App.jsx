import { useState, useEffect } from "react";
import personService from "./services/persons";

const Filter = ({ handleFilterChange }) => {
	return (
		<>
			filter shown with <input onChange={handleFilterChange} />
		</>
	);
};

const Persons = ({ persons, filter, deleteName }) => {
	return (
		<>
			{persons
				.filter((person) =>
					person.name.toLowerCase().startsWith(filter)
				)
				.map((person) => (
					<div key={person.name}>
						{person.name} {person.number}{" "}
						<button onClick={() => deleteName(person)}>
							delete
						</button>
					</div>
				))}
		</>
	);
};

const Form = ({
	handleNameChange,
	handleNumberChange,
	newName,
	newNumber,
	addPerson,
}) => {
	return (
		<>
			<form onSubmit={addPerson}>
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
		</>
	);
};

const Notification = ({ message }) => {
	if (message == null) {
		return null;
	}
	const style = {
		background: "lightgray",
		fontSize: "20px",
		borderStyle: "solid",
		borderColor: "green",
		borderRadius: "5px",
		padding: "10px",
		marginBottom: "10px",
	};
	if (message.color == "red") {
		style.borderColor = "red";
	}
	return (
		<>
			<div style={style}>{message.text}</div>
		</>
	);
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [message, setMessage] = useState(null);

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();
        //todo fix: this doesn't prevent browser1 and browser2 from adding the same person
		if (!persons.some((person) => person.name == newName)) {
			let newPerson = { name: newName, number: newNumber };
			personService.create(newPerson).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNewName("");
				setNewNumber("");
				setMessage({
					text: `Added ${returnedPerson.name} to the phonebook`,
				});
				setTimeout(() => setMessage(null), 5000);
			});
		} else {
			if (
				!window.confirm(
					`${newName} is already in the phonebook. do you wish to update their number?`
				)
			) {
				return;
			}
			let id = persons.filter((person) => person.name == newName)[0].id;
			let changedPerson = { name: newName, number: newNumber, id };
			personService.update(changedPerson, id).then((returnedPerson) => {
				setPersons(
					persons.map((person) => {
						return person.id != returnedPerson.id
							? person
							: returnedPerson;
					})
				);
			});
			setMessage({
				text: `Updated ${changedPerson.name}'s phone number.`,
			});
			setTimeout(() => setMessage(null), 5000);
		}
	};

	const deletePerson = (personToDelete) => {
		console.log(`deleting person ${personToDelete.id}`);
		let res = window.confirm(
			`are you sure you want to delete ${personToDelete.name}?`
		);
		if (!res) {
			return;
		}
		personService
			.delete(personToDelete)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				setMessage({
					text: `${personToDelete.name} was already removed from the server.`,
					color: "red",
				});
			});
		setTimeout(() => setMessage(null), 5000);
		setPersons(persons.filter((person) => person.id != personToDelete.id));
	};

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	useEffect(() => {
		personService
			.getAll()
			.then((initialPersons) => {
				setPersons(initialPersons);
			})
			.catch((error) => console.log(`useEffect error: ${error}`));
	}, []);

	return (
		<div>
			<h1>Phonebook</h1>
			<Notification message={message} />
			<Filter handleFilterChange={handleFilterChange} />
			<h2> add a new </h2>
			<Form
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				newName={newName}
				newNumber={newNumber}
				addPerson={addPerson}
			/>
			<h2>Numbers</h2>
			<br />
			<Persons
				persons={persons}
				filter={filter}
				deleteName={deletePerson}
			/>
		</div>
	);
};

export default App;
