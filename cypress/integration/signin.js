//.  SIGNIN.JS    /
// from https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
//
// Use Cypress env to store passwords for production or dev?
// CYPRESS_password=secret npx cypress open
// Also, please configure the cypress.json file
///

///
/// UPDATE: The use of
// CYPRESS_password=secret npx cypress open
// has to be created each time. Good for CI? Will be
// switching over to a local cypress.env.json
// to be stored in .gitignore
// These vars will override those in cypress.json
// no need for env: {}, just override directly like so:
//  {
//    "username": "tom",
//    "email": "tom@example.com",
//    "password": "secret"
//  }
///

describe("Test login", () => {
  it("login user", () => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.visit("localhost:8100");

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
    // cy.get("[type=Submit]").click();
    cy.get(".button").click();

    cy.location("pathname").should("eq", "/");
  });
});
