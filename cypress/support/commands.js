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

  // it is ok for the email to be visible in the Command Log
  expect(email, "email was set").to.be.a("string").and.not.be.empty;
  // but the password value should not be shown
  if (typeof password !== "string" || !password) {
    throw new Error("Missing password value, set using CYPRESS_password=...");
  }

  cy.get('input[name="emaial"]')
    .type(email)
    .should("have.value", email);


  cy.get("[name=passwd]")
    .type(password, { log: false })
    .should(el$ => {
      if (el$.val() !== password) {
        throw new Error("Different value of typed password");
      }
    });

  cy.get(".button").click();
 })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
