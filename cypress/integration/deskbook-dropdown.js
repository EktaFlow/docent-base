describe("Update deskbook version to 2018 ", function() {
  const email = Cypress.env("email");
  const password = Cypress.env("password");
  const baseUrl = Cypress.env("baseUrl");
  const viewportWidth = Cypress.env("viewportWidth");
  const viewportHeight = Cypress.env("viewportHeight");
  const deskbookVersion = "2018";
  const helpButton = ".buttons > :nth-child(1) > .button-inner";
  const deskbookDropdown = "#deskbook-select";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.viewport(viewportWidth, viewportHeight);
    cy.login(email, password);
  });

  it("validates deskbook version in dropdown", () => {
    cy.get(helpButton).click();
    cy.get(deskbookDropdown).contains(deskbookVersion);
  });
});
