describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
		cy.visit("http://localhost:5173");
	});

	it("Login form is shown", function () {
		cy.get("#loginForm");
	});
});
