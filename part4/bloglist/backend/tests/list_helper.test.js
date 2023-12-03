const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");




test("dummy returns 1", () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe("total likes", () => {
	const listWithOneBlog = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
		},
	];

	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});
});

describe("favorite blog", () => {
	test("favorite blog works", () => {
		const result = listHelper.favoriteBlog(helper.initialBlogs);
		expect(result).toEqual({
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		});
	});
});

describe("most blogs", () => {
	test("when list has multiple blogs, returns author with most blogs.", () => {
		const result = listHelper.mostBlogs(helper.initialBlogs);
		expect(result).toEqual({
			author: "Robert C. Martin",
			blogs: 3,
		});
	});
});

describe("most likes", () => {
	test("when list has multiple blogs, returns author with most likes.", () => {
		const result = listHelper.mostLikes(helper.initialBlogs);
		const answer = {
			author: "Edsger W. Dijkstra",
			likes: 17,
		};
		expect(result).toEqual(answer);
	});
});
