require("dotenv").config();

const PORT = 3005;
// const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
	MONGODB_URI,
	PORT,
};