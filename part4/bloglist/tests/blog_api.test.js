const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// test("tst1", async () => {});

describe("when there is initially one user and many blogs", () => {
	beforeEach(async () => {
		await User.deleteMany({});
		await Blog.deleteMany({});

		const user = {
			username: "rootusername",
			name: "rootname",
			password: "rootpassword",
		};
		const passwordHash = await bcrypt.hash(user.password, 10);
		const userObject = User({
			username: user.username,
			name: user.name,
			passwordHash,
		});
		await userObject.save();
		let userId = userObject.id;
		let response = await api.post("/api/login").send({
			username: user.username,
			password: user.password,
		});
		const token = response.body.token;
		const blogObjects = helper.initialBlogs.map((blog) => {
			return Blog({ ...blog, user: userId });
		});
		const promises = blogObjects.map((blog) => blog.save());
		await Promise.all(promises);
	});

	test("all blogs are returned", async () => {
		const blogs = await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
		expect(blogs.body).toHaveLength(helper.initialBlogs.length);
	});

	test("blogs unique idenfiers are named id", async () => {
		const blogs = await helper.blogsInDb();
		blogs.forEach((blog) => {
			expect(blog.id).toBeDefined();
			expect(blog._id).toBeUndefined();
		});
	});

	test("valid blog can be added to db", async () => {
		const blog = {
			title: "Space Craze 2000",
			author: "Rick Reed",
			url: "http://blog.ricky.com/has_it_gone_too_far/",
		};
		const user = await User.findOne({ username: "rootusername" });
		let userForToken = { username: user.username, id: user._id };
		let token = jwt.sign(userForToken, process.env.SECRET);
		await api
			.post("/api/blogs/")
			.set("Authorization", `Bearer ${token}`)
			.send(blog)
			.expect(201);
		const blogsAfter = await helper.blogsInDb();
		expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1);
		const titles = blogsAfter.map((blog) => blog.title);
		expect(titles).toContain("Space Craze 2000");
	});

	test("blog likes defaults to 0", () => {
		const newBlog = {
			title: "Space Craze",
			author: "Rick Reed",
			url: "http://blog.rickssensationalideas.com/space_craze_has_it_gone_too_far/",
		};
		expect(Blog(newBlog).likes).toBe(0);
	});

	test("blog cannot be created without title", async () => {
		const newBlog = {
			author: "Rick Reed",
			url: "http://blog.rickssensationalideas.com/space_craze_has_it_gone_too_far/",
			likes: 3,
		};
		const user = await User.findOne({ username: "rootusername" });
		let userForToken = { username: user.username, id: user._id };
		let token = jwt.sign(userForToken, process.env.SECRET);
		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${token}`)
			.send(newBlog)
			.expect(400);
	});

	test("blog cannot be created without url", async () => {
		const newBlog = {
			title: "Space Craze 2000",
			author: "Rick Reed",
		};
		const user = await User.findOne({ username: "rootusername" });
		let userForToken = { username: user.username, id: user._id };
		let token = jwt.sign(userForToken, process.env.SECRET);
		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${token}`)
			.send(newBlog)
			.expect(400);
	});

	test("blog delete by id works", async () => {
		let blogsBefore = await helper.blogsInDb();
		let notDeletedBlog = blogsBefore[1];
		let deletedBlog = blogsBefore[0];
		let url = `/api/blogs/${deletedBlog.id}`;
		const user = await User.findOne({ username: "rootusername" });
		let userForToken = { username: user.username, id: user._id };
		let token = jwt.sign(userForToken, process.env.SECRET);
		await api
			.delete(url)
			.set("Authorization", `Bearer ${token}`)
			.expect(204);
		blogsAfter = await helper.blogsInDb();
		expect(blogsAfter).toHaveLength(blogsBefore.length - 1);
		expect(blogsAfter).toContainEqual(notDeletedBlog);
		expect(blogsAfter).not.toContain(deletedBlog);
	});

	test("blog update by id works", async () => {
		let blogsBefore = await helper.blogsInDb();
		let blogToUpdate = blogsBefore[1];
		let newBlog = {
			title: `${blogToUpdate.title} - updated`,
			author: `Sir. ${blogToUpdate.author}`,
			url: `http://fakestreet.com/123`,
			likes: blogToUpdate.likes + 2,
		};
		let url = `/api/blogs/${blogToUpdate.id}`;
		let updatedBlog = await api.put(url).send(newBlog);
		expect(updatedBlog.body.title).toEqual(newBlog.title);
		expect(updatedBlog.body.author).toEqual(newBlog.author);
		expect(updatedBlog.body.url).toEqual(newBlog.url);
		expect(updatedBlog.body.likes).toEqual(newBlog.likes);
	});

	test("blog tst", async () => {});

	afterAll(async () => {
		await mongoose.connection.close();
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
