const cors = require("cors");
const logger = require("./utils/logger");
const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const app = express();

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);
mongoose
	.connect(config.MONGODB_URI)
	.then(logger.info("successful connection to MongoDB"))
	.catch((error) => {
		logger.error("error connecting to MongoDB", error);
	});

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);
module.exports = app;
