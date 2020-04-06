describe("validates DOD Resource link", function() {

  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.login(email,password);
  });

  it("finds proper link for dodmrl website", () => {
    cy.location("pathname").should("eq", "/");
    const helpButton = `topbar.desktop > .toolbar-class > :nth-child(1) >
                        .docent-header > .toolbar > .toolbar-content > .container-toolbar >
                        .container-tbbuttons > #help-open-button > .button-inner`;
    cy.get(helpButton).click();
    cy.get("#mrl-resources-button").should(
      "have.attr",
      "href",
      "http://dodmrl.com/"
    );
  });

});
