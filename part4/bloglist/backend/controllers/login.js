const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const loginRouter = require("express").Router();

loginRouter.post("/", async (request, response) => {
	const { username, password } = request.body;
	let user = await User.findOne({ username });
	let passwordCorrect =
		user === null
			? false
			: await bcrypt.compare(password, user.passwordHash);
	if (!user || !passwordCorrect) {
		return response.status(400).send("password incorrect.");
	} 
	let userForToken = { username: user.username, id: user._id };
	let token = jwt.sign(userForToken, process.env.SECRET);
	response
		.status(200)
		.send({ token: token, username: user.username, name: user.name });
});

module.exports = loginRouter;
