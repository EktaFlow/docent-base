describe("validates DOD Resource link", function() {

  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.login(email,password);
    cy.get(".button").click();
  });



  it("finds proper link for MRL Desktop", () => {
    cy.location("pathname").should("eq", "/");

    cy.get(
      "topbar.desktop > .toolbar-class > :nth-child(1) > .docent-header > .toolbar > .toolbar-content > .container-toolbar > .container-tbbuttons > #help-open-button > .button-inner"
    ).click();

    cy.get("#mrl-resources-button").should(
      "have.attr",
      "href",
      "http://dodmrl.com/"
    );
  });
});
