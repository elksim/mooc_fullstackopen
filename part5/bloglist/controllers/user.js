const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response, next) => {
	let users = await User.find({});
	response.json(users);
    
});

userRouter.post("/", async (request, response) => {
	const { username, password } = request.body;

	if (password.length < 3) {
		response
			.status(400)
			.json({ error: "password must be at least 3 characters long" });
	}
	let saltRounds = 10;
	let passwordHash = await bcrypt.hash(password, saltRounds);

	const user = User({
		username,
		passwordHash,
	});
	const savedUser = await user.save();
	response.set(201).json(savedUser);
});

module.exports = userRouter;
