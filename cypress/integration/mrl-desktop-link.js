
describe("Validates MRL Deskbook version", function() {
  const email = Cypress.env("email");
  const password = Cypress.env("password");
  const baseUrl = Cypress.env("baseUrl");
  const viewportWidth = Cypress.env("viewportWidth");
  const viewportHeight = Cypress.env("viewportHeight");
  const urlLink = "http://www.dodmrl.com/MRL_Deskbook_2018.pdf";
  const helpButtonPopUp =
      "topbar.desktop > .toolbar-class > :nth-child(1) > .docent-header > .toolbar > .toolbar-content > .container-toolbar > .container-tbbuttons > #help-open-button > .button-inner";
  const helpButton = "#mrl-deskbook-button";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.login(email,password);
    cy.viewport(viewportWidth, viewportHeight);
  });

  it("finds proper link for MRL Desktop", () => {
    cy.get(helpButtonPopUp).click()
    cy.get(helpButton).should("have.attr","href",urlLink);
  });
});
