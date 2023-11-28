dummy = (blogs) => {
	return 1;
};

totalLikes = (blogs) => {
	return blogs.reduce((acc, blog) => (acc += blog.likes), 0);
};

favoriteBlog = (blogs) => {
	const dummy = { dummy: true, likes: 0 };
	const result = blogs.reduce((acc, blog) => {
		console.log(acc);
		if (blog.likes > acc.likes) {
			return blog;
		} else {
			return acc;
		}
	}, dummy);
	if (result.dummy) {
		return null;
	} else {
		return { title: result.title, author: result.author, url: result.url };
	}
};

mostBlogs = (blogs) => {
	let authorMap = new Map();
	blogs.forEach((blog) => {
		authorMap.set(blog.author, (authorMap.get(blog.author) || 0) + 1);
	});
	let result = { author: null, blogs: -1 };
	authorMap.forEach((blogs, author) => {
		if (blogs > result.blogs) {
			result = { author, blogs };
		}
	});
	return result.blogs != -1 ? result : null;
};

mostLikes = (blogs) => {
	let authorMap = new Map();
	blogs.forEach((blog) => {
		authorMap.set(
			blog.author,
			(authorMap.get(blog.author) || 0) + blog.likes
		);
	});
	let result = { author: null, likes: -1 };
	authorMap.forEach((likes, author) => {
		if (likes > result.likes) {
			result = { author, likes };
		}
	});
	return result.likes != -1 ? result : null;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
