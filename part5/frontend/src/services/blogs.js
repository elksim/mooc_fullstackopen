import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
	console.log(`setting token to ${newToken}`);
	token = `Bearer ${newToken}`;
};

const createBlog = async (newBlog) => {
	console.log("calling create blog");
	console.log("props: ", newBlog);
	const { title, author, url } = newBlog;
	const config = { headers: { Authorization: token } };
	console.log('config: ', config);
    try {
        const response = await axios.post(baseUrl, newBlog, config);
        console.log("!!response: ", response);
        return response
    } catch {
        (exception) => {
            console.log('error caught');
            console.log('exception: ', exception);
        }
    }
};

const getAll = async () => {
	const response = await axios.get(baseUrl);
    console.log('getting all blogs');
    console.log('response.data: ', response.data);
	return response.data;
};

export default { getAll, setToken, createBlog };
