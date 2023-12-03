import axios from "axios";
let baseUrl = "http://localhost:3000/persons";

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

// const exists = (id) => {
// 	let url = `${baseUrl}/${id}`;
// 	let request = axios.head(url);
// 	request
// 		.then((response) => {
// 			return true;
// 		})
// 		.catch(error => {});
// 	return false;
// };

const create = (person) => {
	const request = axios.post(baseUrl, person);
	return request.then((response) => response.data);
};

const update = (person, id) => {
	console.log(`calling personService.update`);
	let url = `${baseUrl}/${person.id}`;
	const request = axios.put(url, person);
	return request.then((response) => response.data);
};

const _delete = (person) => {
	let url = `${baseUrl}/${person.id}`;
	const request = axios.delete(url);
	return request.then((response) => response.data);
};

export default {
	getAll,
	// exists,
	create,
	update,
	delete: _delete,
};
