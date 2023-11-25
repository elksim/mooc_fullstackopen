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

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();
		if (!persons.some((person) => person.name == newName)) {
			let newPerson = { name: newName, number: newNumber };
			personService.create(newPerson).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNewName("");
				setNewNumber("");
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
		personService.delete(personToDelete).then((response) => {
			console.log(response);
			setPersons(
				persons.filter((person) => person.id != personToDelete.id)
			);
		});
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
