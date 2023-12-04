const Notification = ({ message, color }) => {
    console.log(`Notification called with ${message} and ${color}`);
	if (message === null) {
		return null;
	}

	const style = {
		borderStyle: "solid",
		borderRadius: "5px",
		background: "lightgrey",
		padding: "10px",
	};
	if (color === "green") {
		style.color = "green";
	}
	if (color === "red") {
		style.color = "red";
	}

	return (
		<>
			<h3 style={style}>{message}</h3>
		</>
	);
};


export default Notification;