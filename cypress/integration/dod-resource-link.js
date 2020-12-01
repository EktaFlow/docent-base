describe("validates DOD Resource link", function() {
  const email = Cypress.env("email");
  const password = Cypress.env("password");
  const baseUrl = Cypress.env("baseUrl");
  const viewportWidth = Cypress.env("viewportWidth");
  const viewportHeight = Cypress.env("viewportHeight");
  const helpButton = `topbar.desktop > .toolbar-class > :nth-child(1) >
                        .docent-header > .toolbar > .toolbar-content > .container-toolbar >
                        .container-tbbuttons > #help-open-button > .button-inner`;
  const mrlResourceButton = "#mrl-resources-button";
  const urlLink = "http://dodmrl.com/";

  beforeEach(() => {
    cy.viewport(viewportWidth, viewportHeight);
    cy.visit(baseUrl);
    cy.login(email, password);
  });

  it("finds proper link for dodmrl website", () => {
    cy.get(helpButton).click();
    cy.get(mrlResourceButton).should("have.attr","href",urlLink);
  });
});
