import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filter, handleFilter }) => {
	return (
		<>
			<input onChange={handleFilter} />
		</>
	);
};

const SingleResult = ({ result }) => {
	const [country, setCountry] = useState(null);

	useEffect(() => {
		let url = `https://studies.cs.helsinki.fi/restcountries/api/name/${result.name.common}`;
		axios.get(url).then((response) => {
			setCountry(response.data);
		});
	}, []);

	if (!country) {
		return <>loading {result.name.common}</>;
	}

	let languages = Object.entries(country.languages).map(([_, v]) => v);
	return (
		<>
			<h2>{country.name.common}</h2>
			capital {country.capital}
			<br />
			area {country.area}
			<br />
			<h3>languages</h3>
			<ul>
				{languages.map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img
				src={country.flags.png}
				alt={`Flag of ${country.name.common}`}
			/>
		</>
	);
};

const Results = ({ results }) => {
	if (results.length == 0) {
		return null;
	} else if (results.length == 1) {
		console.log(`result.length == 1!`);
		return (
			<>
				<SingleResult result={results[0]} />
			</>
		);
	} else if (results.length <= 10) {
		return (
			<>
				<ul>
					{results.map((result) => (
						<li key={result.name.common}>{result.name.common}</li>
					))}
				</ul>
			</>
		);
	} else {
		return <>too many matches, specify another filter</>;
	}
};

const App = () => {
	const [filter, setFilter] = useState("");
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		axios
			.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((response) => {
				console.log("fetching countries from online api");
				setCountries(response.data);
			});
		// axios.get("http://localhost:3002/countries").then((response) => {
		// 	console.log("fetching countries from local db.json");
		// 	setCountries(response.data);
		// });
	}, []);

	const handleFilter = (event) => {
		setFilter(event.target.value);
	};

	let resultCountries = countries.filter(
		(country) =>
			country.name.common.toLowerCase().includes(filter) ||
			country.name.official.toLowerCase().includes(filter)
	);
	console.log(`${resultCountries}`);

	return (
		<>
			<input onChange={handleFilter} />
			<br />
			<Results results={resultCountries} />
		</>
	);
};

export default App;
