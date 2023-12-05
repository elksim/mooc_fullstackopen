import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const create = async (newBlog) => {
	const config = { headers: { Authorization: token } };
	try {
		const response = await axios.post(baseUrl, newBlog, config);
		return response.data;
	} catch {
		(exception) => {
			console.log("error caught");
			console.log("exception: ", exception);
		};
	}
};

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

export default { getAll, setToken, create };
