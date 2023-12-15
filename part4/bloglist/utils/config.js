require("dotenv").config();

// const PORT = process.env.PORT;
const PORT = 3005;
const MONGODB_URI =
	process.env.NODE_ENV == "test"
		? process.env.TEST_MONGODB_URI
		: process.env.MONGODB_URI;
console.log('process.env.TEST_MONGODB_URI: ', process.env.TEST_MONGODB_URI);
console.log('process.env.MONGODB_URI;: ', process.env.MONGODB_URI);
console.log("setting MOGODB_URI to", MONGODB_URI);

module.exports = {
	MONGODB_URI,
	PORT,
};
