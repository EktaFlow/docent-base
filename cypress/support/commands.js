
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  expect(email, "email was set").to.be.a("string").and.not.be.empty;
  cy.get('input[name="emaial"]').type(email);
  cy.get("[name=passwd]").type(password, { log: false });
  cy.get(".button").click();
});
