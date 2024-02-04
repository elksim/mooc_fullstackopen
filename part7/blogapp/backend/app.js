const cors = require("cors");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");

const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const commentRouter = require("./controllers/comment");

const app = express();

mongoose.set("strictQuery", false);

if (process.env.NODE_ENV === "test") {
	console.log("adding testingRouter");
	const testingRouter = require("./controllers/testing");
	app.use("/api/testing", testingRouter);
}

logger.info("connecting to", config.MONGODB_URI);
mongoose
	.connect(config.MONGODB_URI)
	.then(logger.info("successful connection to MongoDB"))
	.catch((error) => {
		logger.error("error connecting to MongoDB", error);
	});

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);
app.use(middleware.userExtractor);
// app.use("/api/blogs/:id/comment", commentRouter);
app.use(
	"/api/blogs/:id/comment",
	(request, response, next) => {
		const id = request.params.id;
		console.log("id from route: ", id);
		request.idFromRoute = id; // Attach the id to the request object
		next();
	},
	commentRouter
);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
