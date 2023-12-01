/* eslint-disable linebreak-style */
require("dotenv").config();
const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give a password as an argument.");
	process.exit(1);
}

let password = process.argv[2];
const url = `mongodb+srv://elliottbotha:${password}@cluster0.uzl1utq.mongodb.net/notebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

// let newPerson = new Person({
// 	name: "devil",
// 	number: "666-",
// });

// newPerson.save().then((result) => {
// 	console.log("newPerson saved!");
// 	mongoose.connection.close();
// });

if (process.argv.length === 3) {
	Person.find({}).then((result) => {
		result.forEach((person) => {
			console.log(person);
		});
		mongoose.connection.close();
	});
} else if (process.argv.length === 5) {
	let [_name, number] = [process.argv[3], process.argv[4]];
	let newPerson = new Person({ name: _name, number: number });
	console.log(`${newPerson}`);
	newPerson.save().then((_result) => {
		console.log(`added ${_name} number ${number} to the notebook`);
		mongoose.connection.close();
	});
}
