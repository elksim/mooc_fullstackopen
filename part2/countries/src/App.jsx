import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filter, handleFilter }) => {
	return (
		<>
			<input onChange={handleFilter} />
		</>
	);
};

const Weather = ({ country, apiKey }) => {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		let url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${country.name.common}&days=1&aqi=no&alerts=no`;
		let request = axios.get(url).then((response) => {
			{
				let data = response.data;
				setWeather({
					temperature: data.current.temp_c,
					windSpeed: data.current.wind_kph,
					icon: data.current.condition.icon,
					text: data.current.condition.text,
				});
			}
		});
	}, []);
	if (!weather) {
		return <>loading weather</>;
	} else {
		console.log(`${weather.temperature}`);
	}

	return (
		<>
			temperature: {weather.temperature} Celcius <br />
			<img src={weather.icon} alt={weather.text} /> <br />
			wind speed:{weather.windSpeed} m/s
		</>
	);
};

const SingleResult = ({ result, apiKey }) => {
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
			<br />
			<Weather country={country} apiKey={apiKey} />
		</>
	);
};

const Results = ({ results, setFilter, apiKey }) => {
	if (results.length == 0) {
		return null;
	} else if (results.length == 1) {
		console.log(`result.length == 1!`);
		return (
			<>
				<SingleResult result={results[0]} apiKey={apiKey} />
			</>
		);
	} else if (results.length <= 10) {
		return (
			<>
				<ul>
					{results.map((result) => (
						<li key={result.name.common}>
							{result.name.common}
							<button
								onClick={() =>
									setFilter(`${result.name.common}`)
								}
							>
								view
							</button>
						</li>
					))}
				</ul>
			</>
		);
	} else {
		return <>too many matches, specify another filter</>;
	}
};

const App = () => {
	const apiKey = import.meta.env.VITE_SOME_KEY;
	const [filter, setFilter] = useState("");
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		// axios
		// 	.get("https://studies.cs.helsinki.fi/restcountries/api/all")
		// 	.then((response) => {
		// 		console.log("fetching countries from online api");
		// 		setCountries(response.data);
		// 	});
		axios.get("http://localhost:3002/countries").then((response) => {
			console.log("fetching countries from local db.json");
			console.log(`${response.data.length}`);
			setCountries(response.data);
		});
	}, []);

	const handleFilter = (event) => {
		setFilter(event.target.value);
	};

	let resultCountries = countries.filter(
		(country) =>
			country.name.common.toLowerCase().includes(filter.toLowerCase()) ||
			country.name.official.toLowerCase().includes(filter.toLowerCase())
	);
	console.log(`filter: ${filter}`);
	console.log(`result country length: ${resultCountries.length}`);
	return (
		<>
			<input value={filter} onChange={handleFilter} />
			<br />
			<Results
				results={resultCountries}
				setFilter={setFilter}
				apiKey={apiKey}
			/>
			<br />
		</>
	);
};

export default App;
