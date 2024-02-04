const Comment = require("../models/comment");
const Blog = require("../models/blog");
const commentRouter = require("express").Router();

commentRouter.post("", async (request, response) => {
	console.log("xd");
	const blogId = request.idFromRoute;
	const commentText = request.body.comment;
	const comment = await Comment({ text: commentText, blog: blogId });
	await comment.save();
	await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment } });
	const blog = await Blog.findOne({ _id: blogId });
	return response.status(201).json(blog);
});

module.exports = commentRouter;
