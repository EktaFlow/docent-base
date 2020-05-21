describe("Validates error on email creation failure", function () {
  const email = Cypress.env("email");
  const password = Cypress.env("password");
  const baseUrl = Cypress.env("baseUrl");
  const viewportWidth = Cypress.env("viewportWidth");
  const viewportHeight = Cypress.env("viewportHeight");

  // New assessment vars
  const startNewButton = ".buttons > :nth-child(1) > .button-inner";
  const addNewEmailButton = ".member-inputs > .desktop";
  const errorMessage = ".error-message";

  const beginNewAssesment = () => {
    cy.get(startNewButton).click();
  };

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.login(email, password);
    cy.viewport(viewportWidth, viewportHeight);
  });

  it("finds proper error message on submit empty email", () => {
    beginNewAssesment();
    cy.get(addNewEmailButton).click();
    cy.get(errorMessage)
    .should(($error) => {
      expect($error)
      .to.contain.text(`You must enter an email address for the team member`);
    });
  });
});


