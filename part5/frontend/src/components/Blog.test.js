import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
	let container;
	let likeBlog;
	beforeEach(() => {
		const blogUser = {
			username: "saruman",
			blogs: [],
		};
		const blog = {
			title: "my title",
			author: "mrs. author",
			url: "http://wow.com",
			user: blogUser,
			likes: 10,
		};
		likeBlog = jest.fn();
		const deleteBlog = jest.fn();

		container = render(
			<Blog
				blog={blog}
				likeBlog={likeBlog}
				username="saruman"
				deleteBlog={deleteBlog}
			/>
		).container;
	});

	test("displays only blog.title and blog.author by default", () => {
		let element1 = container.querySelector(".defaultContent");
		expect(element1).not.toHaveStyle("display: none");
		let element2 = container.querySelector(".toggleableContent");
		expect(element2).toHaveStyle("display: none");
	});

	test("displays likes and url when view button is clicked", async () => {
		const user = userEvent.setup();

		let viewButton = screen.getByText("view");
		await user.click(viewButton);
		let element = container.querySelector(".toggleableContent");
		expect(element).not.toHaveStyle("display: none");
	});

	test("clicking like twice calls likeBlog twice", async () => {
		let user = userEvent.setup();

		let likeButton = screen.getByText("like");
		await user.click(likeButton);
		await user.click(likeButton);
		expect(likeBlog.mock.calls).toHaveLength(2);
	});
});
