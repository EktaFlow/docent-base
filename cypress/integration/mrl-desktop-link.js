
describe("Validates MRL Deskbook version", function() {

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
    let urlLink = "http://www.dodmrl.com/MRL_Deskbook_2018.pdf";
    let helpButton =
      "topbar.desktop > .toolbar-class > :nth-child(1) > .docent-header > .toolbar > .toolbar-content > .container-toolbar > .container-tbbuttons > #help-open-button > .button-inner";

    cy.location("pathname").should("eq", "/");
    cy.get(helpButton).click()
    cy.get("#mrl-deskbook-button").should("have.attr","href",urlLink);
  });
});
