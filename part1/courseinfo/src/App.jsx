const Header = (props) => {
	const course = props.course;
	return (
		<>
			<h1>{course}</h1>
		</>
	);
};

const Part = (props) => {
	return (
		<>
			<p>
				{props.name} {props.exercises}
			</p>
		</>
	);
};

const Content = (props) => {
	const parts = props.parts;
	return (
		<>
			<Part name={parts[0][0]} exercises={parts[0][1]} />
			<Part name={parts[1][0]} exercises={parts[1][1]} />
			<Part name={parts[2][0]} exercises={parts[2][1]} />
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
