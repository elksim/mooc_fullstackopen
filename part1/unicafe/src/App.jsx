import { useState } from "react";

const StatisticLine = (text, value) => (
	<>
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	</>
);

const Statistics = ({ bad, neutral, good }) => {
	let total = bad + neutral + good;
	if (total === 0) {
		return (
			<>
				<h2>statistics</h2> No feedback given
			</>
		);
	} else {
		return (
			<>
				<h2>statistics</h2>
				<table>
                    <tbody>
					{StatisticLine("good", good)}
					{StatisticLine("neutral", neutral)}
					{StatisticLine("bad", bad)}
					{StatisticLine("total", total)}
					{StatisticLine(
						"average",
						(good - bad) / (bad + neutral + good)
					)}
					{StatisticLine("positive", good / total)}
                    </tbody>
				</table>
			</>
		);
	}
};

const Button = ({ text, value, setFunction }) => {
	return (
		<>
			<button onClick={() => setFunction(value + 1)}>{text}</button>
		</>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<>
			<h1>give feedback</h1>
			<Button text="bad" value={bad} setFunction={setBad} />
			<Button text="neutral" value={neutral} setFunction={setNeutral} />
			<Button text="good" value={good} setFunction={setGood} />
			<Statistics bad={bad} neutral={neutral} good={good} />
		</>
	);
};

export default App;
