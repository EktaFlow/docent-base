describe("determine MR Level is same as Target MRL", function() {
  const value = 9;
  const deskbookVersion = "2018";

  beforeEach(() => {
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
    cy.get(".button").click();
    cy.location("pathname").should("eq", "/");
  });

  it("validates deskbook version in dropdown", () => {

    // advance initial page
    cy.get(".buttons > :nth-child(1) > .button-inner").click();

    cy.get("#deskbook-select")
      .contains(deskbookVersion);
    });
  });
