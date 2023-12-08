describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
		let user = {
			name: "root name",
			username: "root username",
			password: "root password",
		};
		cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
		cy.visit("");
	});

	it("Login form is shown", function () {
		cy.get("#loginForm");
	});

	describe("Login", function () {
		it("succeeds with  correct credentials", function () {
			cy.get("#username").type("root username");
			cy.get("#password").type("root password");
			cy.contains("button", "login").click();
			cy.contains("root username is logged in.");
		});
		it("fails with invalid credentials", function () {
			cy.get("#username").type("root username");
			cy.get("#password").type("this is an incorrect password");
			cy.contains("button", "login").click();
			cy.contains("invalid credentials")
				.and("have.css", "border-style", "solid")
				.and("have.css", "color", "rgb(255, 0, 0)");
		});
	});
	describe("When logged in", function () {
		beforeEach(function () {
			cy.login({ username: "root username", password: "root password" });
		});
		it("A new blog can be created", function () {
			cy.contains("new blog").click();
			cy.get("#title").type("new title");
			cy.get("#author").type("new author");
			cy.get("#url").type("http://newurl.com");
			cy.get("form").submit();
			cy.contains("new title - new author");
		});
		describe("And one blog exists", function () {
			beforeEach(() => {
				cy.createBlog({
					title: "blog title1",
					author: "blog author1",
					url: "http://blogurl1.com",
				});
			});
			it("user can like blog", function () {
				cy.contains("view").click();
				cy.get("#likeCount")
					.invoke("text")
					.then((likesBefore) => {
						cy.log("likesBefore:", likesBefore);
						cy.get("#like")
							.click()
							.then(() => {
								cy.get("#likeCount").should(
									"have.text",
									(Number(likesBefore) + 1).toString()
								);
							});
					});
			});
			it("creator can delete blog", function () {
				cy.contains("button", "view").click();
				cy.contains("delete").click();
				cy.get("div.blog").should("not.exist");
			});
			it("only creator can see delete button", function () {
				//first check that creator sees delete button
				cy.contains("button", "view").click();
				cy.get('button:contains("delete")').should("exist");
				//now that non-creators do not see delete button
				let user2 = {
					name: "second name",
					username: "second username",
					password: "second password",
				};
				cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
				cy.visit("");
				cy.contains("button", "logout").click();
				cy.visit("");
				cy.login({
					username: "second username",
					password: "second password",
				});
				cy.contains("button", "view").click();
				cy.get('button:contains("delete")').should("not.be.visible");
			});
		});
		describe("And multiple blogs exist", function () {
			beforeEach(() => {
				cy.createBlog({
					title: "title1",
					author: "author1",
					url: "url1",
				});
				cy.createBlog({
					title: "title2",
					author: "author2",
					url: "url2",
				});
				cy.createBlog({
					title: "title3",
					author: "author3",
					url: "url3",
				});
			});
			it("blogs are ordered by likes", () => {
				cy.get(".blog").eq(0).contains("button", "view").click();
				cy.get(".blog").eq(1).contains("button", "view").click();
				cy.get(".blog").eq(2).contains("button", "view").click();
				cy.get(".blog").eq(0).contains("title1");
				cy.get(".blog").eq(1).contains("title2");
				cy.get(".blog").eq(2).contains("title3");
				cy.get(".blog").eq(1).contains("button", "like").click();
				cy.get(".blog").eq(0).contains("title2");
				cy.get(".blog").eq(1).contains("title1");
				cy.get(".blog").eq(2).contains("title3");
				cy.get(".blog").eq(2).contains("button", "like").click().click();
				cy.get(".blog").eq(0).contains("title3");
				cy.get(".blog").eq(1).contains("title2");
				cy.get(".blog").eq(2).contains("title1");
				cy.get(".blog").eq(2).contains("button", "like").click().click().click();
				cy.get(".blog").eq(0).contains("title1");
				cy.get(".blog").eq(1).contains("title3");
				cy.get(".blog").eq(2).contains("title2");
			});
		});
	});
});
