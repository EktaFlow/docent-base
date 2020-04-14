describe("A downloadable link for User's Guide", function() {
  const email = Cypress.env("email");
  const password = Cypress.env("password");
  const baseUrl = Cypress.env("baseUrl");
  const viewportWidth = Cypress.env("viewportWidth");
  const viewportHeight = Cypress.env("viewportHeight");

  const urlLink = "http://www.dodmrl.com/Users_Guide_2018_Version1.xlsm";
  const helpButton =
        "topbar.desktop > .toolbar-class > :nth-child(1) > .docent-header > .toolbar > .toolbar-content > .container-toolbar > .container-tbbuttons > #help-open-button > .button-inner";
  const usersGuideButton = "#users-guide-button";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.login(email, password);
    cy.viewport(viewportWidth, viewportHeight);
  });

  it("finds proper link for MRL Desktop", () => {
    cy.get(helpButton).click();
    cy.get(usersGuideButton).should("have.attr", "href", urlLink);
  });
});
