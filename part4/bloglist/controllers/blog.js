const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response, next) => {
	let blogs = await Blog.find({}).populate("user");
	response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
	const user = request.user;
	if (user === undefined || user === null) {
		return response.status(401).json({ error: "no user logged in" });
	}
	const body = request.body;
	const blog = new Blog({
		title: body.title,
		url: body.url,
		author: body.author,
		likes: body.likes,
		user: user.id,
	});
	const savedBlog = await blog.save();

	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();
	response.status(201).json(savedBlog);
});

blogRouter.put("/:id", async (request, response) => {
	const body = request.body;

	const newBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	};
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		newBlog,
		{ new: true }
	);
	response.json(updatedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
	const user = request.user;
	if (user === undefined) {
		return response.status(401).json({ error: "no user logged in" });
	}
	let blog = await Blog.findById(request.params.id);
	let blogUserId = blog.user.toString();
	if (blogUserId !== user.id) {
		return response.status(401).json({
			error: "blog can only be deleted by the user that created it",
		});
	}
	await Blog.findByIdAndDelete(request.params.id);
	user.blog = user.blogs.filter((blog) => blog.id != deletedBlog.id);
	response.status(204).end();
});

module.exports = blogRouter;
