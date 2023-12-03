const Header = ({ course }) => <h2>{course.name}</h2>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ parts }) => {
	let exercisesSum = parts.reduce((sum, part) => (sum += part.exercises), 0);
	console.log("exercisesSum ", exercisesSum);
	return (
		<>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
			<b>total of {exercisesSum} exercises</b>
		</>
	);
};

const Course = ({ course }) => (
	<>
		<Header course={course} />
		<Content parts={course.parts} />
	</>
);

export default Course;
