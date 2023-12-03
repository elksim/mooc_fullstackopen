require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./models/person.js");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const errorHandler = (error, request, response, next) => {
	console.log(error.message);

	if (error.name === "CastError") {
		console.log("cast error");
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		console.log("validation errorer");
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint." });
};

app.use(
	morgan(function (tokens, req, res) {
		let out = [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, "content-length"),
			"-",
			tokens["response-time"](req, res),
			"ms",
		].join(" ");
		if (tokens.method(req, res) === "POST") {
			out += ` ${JSON.stringify(req.body)}`;
		}
		return out;
	})
);

let persons = [
	// {
	// 	id: 1,
	// 	name: "Arto Hellas",
	// 	number: "040-123456",
	// },
	// {
	// 	id: 2,
	// 	name: "Ada Lovelace",
	// 	number: "39-44-5323523",
	// },
	// {
	// 	id: 3,
	// 	name: "Dan Abramov",
	// 	number: "12-43-234345",
	// },
	// {
	// 	id: 4,
	// 	name: "Mary Poppendieck",
	// 	number: "39-23-6423122",
	// },
];

app.get("/", (request, response) => {
	console.log("hello world");
	response.send("<h1>Hello World!<h1/>");
});

app.get("/info", (_request, response, next) => {
	let time = new Date();
	Person.countDocuments({}).then((count) => {
		response.send(`Phonebook has numbers for ${count} people. ${time}`);
	});
});

app.get("/api/persons", (_request, response) => {
	Person.find({}).then((notes) => response.json(notes));
});

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
	console.log("calling POST /api/persons");
	let body = request.body;

	if (!body) {
		return response.status(400).end();
	}
	if (!body.name) {
		return response.status(400).json("name must be specified.").end();
	}
	if (!body.number) {
		return response.status(400).json("number must be specified.").end();
	}
	let newPerson = Person({
		name: body.name,
		number: body.number,
	});
	newPerson
		.save()
		.then((savedPerson) => {
			response.json(savedPerson);
		})
		.catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
	console.log("updating person ${body.name}");
	const body = request.body;
	const person = {
		name: body.name,
		number: body.number,
	};
	Person.findByIdAndUpdate(request.params.id, person, {
		new: true,
		runValidators: true,
	})
		.then((updatedPerson) => response.json(updatedPerson))
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
	console.log(`deleting person ${request.params.id}`);
	Person.findByIdAndDelete(request.params.id)
		.then((removedPerson) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`app is listening on port ${PORT}`);
});
