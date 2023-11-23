const Header = (props) => {
	const course = props.course;
	return (
		<>
			<h1>{course}</h1>
		</>
	);
};

const Content = (props) => {
	const parts = props.parts;
	return (
		<>
			<p>
				{parts[0][0]} {parts[0][1]}
			</p>
			<p>
				{parts[1][0]} {parts[1][1]}
			</p>
			<p>
				{parts[2][0]} {parts[2][1]}
			</p>
		</>
	);
};

const Total = (props) => {
	return (
		<>
			<p>Number of exercises {props.total}</p>
		</>
	);
};

const App = () => {
	const course = "Half Stack application development";
	// content[_] => [part, number_of_exercises]
	const parts = [
		["Fundamentals of React", 10],
		["Using props to pass data", 7],
		["State of a component", 14],
	];

	return (
		<>
			<Header course={course} />
			<Content parts={parts} />
			<Total total={parts[0][1] + parts[1][1] + parts[2][1]} />
		</>
	);
};

export default App;
