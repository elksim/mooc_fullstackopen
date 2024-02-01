import axios from "axios";

let config = undefined;
const setConfig = (newToken) => {
  config = { headers: { Authorization: `Bearer ${newToken}` } };
};
export const setToken = (newToken) => {
  setConfig(newToken);
};

export const getAllBlogs = async () => {
  const response = await axios.get("api/blogs");
  return response.data;
};

export const addBlog = async (newBlog) => {
  const response = await axios.post("api/blogs", newBlog, config);
  return response.data;
};

export const updateBlog = async (updatedBlog) => {
  const response = await axios.put(`api/blogs/${updatedBlog.id}`, updatedBlog);
  return response.data;
};

export const deleteBlog = async (blog) => {
  console.log("config: ", config);
  await axios.delete(`api/blogs/${blog.id}`, config);
};

export const login = async (credentials) => {
  const response = await axios.post("/api/login", credentials);
  return response;
};
