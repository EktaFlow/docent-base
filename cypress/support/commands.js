
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
});
