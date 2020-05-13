
describe("Able to reset password", function () {
  const email = Cypress.env("email");
  const password = Cypress.env("password");
  const baseUrl = Cypress.env("baseUrl");
  const viewportWidth = Cypress.env("viewportWidth");
  const viewportHeight = Cypress.env("viewportHeight");

  const settingsButton = '.buttons > :nth-child(3) > .button-inner'
  const resetPWButton = "div.desktop > :nth-child(2) > .button-inner"
  const resetButton = "password-reset > #page-container > :nth-child(2) > #login-container > #button-container > .button > .button-inner"

  const emailInput = ".ng-untouched"
  const blankEmail = ' ';
  const toastHeader = '#toast-hdr-0'
  const emailInvalidMessage = "You must enter some email address";


  beforeEach(() => {
    cy.visit(baseUrl);
    cy.login(email, password);
    cy.viewport(viewportWidth, viewportHeight);
  });



  it("enters blank email", () => {
    cy.get(settingsButton).click()
    cy.get(resetPWButton).click()
    cy.get(emailInput).invoke('val', blankEmail)
    cy.get(resetButton).click()
    cy.get(toastHeader).should(($error) => {
      expect($error).to.contain.text(emailInvalidMessage);
    });
  });

  // // TODO:
  // it("displays proper email validations", () => {
  //   cy.get(settingsButton).click()
  //   cy.get(resetPWButton).click()
  //   cy.get(emailInput).type(emailInvalid);
  //   cy.get(resetButton).click()
  //   cy.get(toastHeader).should(($error) => {
  //     expect($error).to.contain.text(emailInvalidMessage);
  //   });
  // });

});
