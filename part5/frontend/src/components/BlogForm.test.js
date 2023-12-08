import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> calls createBlog with the correct details", async () => {
	const user = userEvent.setup();
	const createBlog = jest.fn();
	render(<BlogForm createBlog={createBlog} />);

	const inputs = screen.getAllByRole("textbox");
	await user.type(inputs[0], "the author");
	await user.type(inputs[1], "the title");
	await user.type(inputs[2], "http://url.com");
	let sendButton = screen.getByText("submit");
	await user.click(sendButton);

	expect(createBlog).toHaveBeenCalledWith({
		title: "the title",
		author: "the author",
		url: "http://url.com",
	});
});
