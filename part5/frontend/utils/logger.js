const logger = {};

logger.info = (text) => {
	if (process.env.NODE_ENV !== "test") {
		console.log(text);
	}
};

logger.warning = (text) => {
	if (process.env.NODE_ENV !== "test") {
		console.log(text);
	}
};

export default logger;
