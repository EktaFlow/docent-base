describe("determine MR Level is same as Target MRL", function() {
  const value = 9;

  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);

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
  });

  it("finds proper link for MRL Desktop", () => {
    cy.location("pathname").should("eq", "/");

    cy.get(
      "topbar.desktop > .toolbar-class > :nth-child(1) > .docent-header > .toolbar > .toolbar-content > .container-toolbar > .container-tbbuttons > #help-open-button > .button-inner"
    ).click();

    cy.get("#users-guide-button").should(
      "have.attr",
      "href",
      "http://www.dodmrl.com/Users_Guide_2018_Version1.xlsm"
    );
  });
});
