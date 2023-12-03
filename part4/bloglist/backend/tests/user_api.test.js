const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("when there is initially one user in the database", () => {
	beforeEach(async () => {
		await User.deleteMany({});
		const passwordHash = await bcrypt.hash("sekret", 10);
		let user = User({
			username: "root",
			name: "benathan",
			passwordHash: passwordHash,
		});
		await user.save();
	});

	test("creation fails with proper status and message if username is not unique", async () => {
		let user = {
			username: "root",
			name: "kenathan",
			password: "123",
		};
		let response = await api
			.post("/api/users/")
			.send(user)
			.expect(400)
			.expect("content-type", /application\/json/);

		expect(response.body.error).toContain(
			" expected `username` to be unique"
		);
	});
	test("creation fails if password isn't longer than 3 characters", async () => {
		let user = {
			username: "benathonian",
			password: "12",
		};
		let response = await api
			.post("/api/users/")
			.send(user)
			.expect(400)
			.expect("content-type", /application\/json/);

		expect(response.body.error).toContain(
			"password must be at least 3 characters long"
		);
	});
	test("creation fails if username isn't longer than 3 characters", async () => {
		let user = {
			username: "jo",
			password: "123",
		};
		let response = await api
			.post("/api/users/")
			.send(user)
			.expect(400)
			.expect("content-type", /application\/json/);

		expect(response.body.error).toContain(
			"is shorter than the minimum allowed length (3)."
		);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
