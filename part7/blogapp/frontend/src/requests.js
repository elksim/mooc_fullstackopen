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

// export const addBlog = async (newBlog) => {
//   try {
//     const response = await axios.post("api/blogs", newBlog, config);
//     return response.data;
//   } catch {
//     (exception) => {
//       console.log("could not add blog: ", exception);
//     };
//   }
// };

export const updateBlog = async (updatedBlog) => {
  const response = await axios.put(
    `api/blogs/${updatedBlog.id}`,
    updatedBlog,
    config
  );
  return response.data;
};

export const deleteBlog = async (blog) => {
  await axios.delete(`api/blogs/${blog.id}`, config);
};
