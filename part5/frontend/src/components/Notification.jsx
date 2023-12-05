const Notification = ({ message, color }) => {
	if (message === null) {
		return null;
	}

	const style = {
		borderStyle: "solid",
		borderRadius: "5px",
		background: "lightgrey",
		padding: "10px",
		color: color,
	};

	return (
		<>
			<h3 style={style}>{message}</h3>
		</>
	);
};


export default Notification;