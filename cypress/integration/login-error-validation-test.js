
describe("Error validations on Login page should be visible ", function () {
  const baseUrl = Cypress.env("baseUrl");
  const viewportWidth = Cypress.env("viewportWidth");
  const viewportHeight = Cypress.env("viewportHeight");

  const emailInvalid = "j#j.com";
  const passwordInvalid = "111";

  const emailBlankId = "#email-blank";
  const passwordBlankId = "#password-blank";
  const emailInvalidId = "#email-invalid";
  const passwordInvalidId = "#password-invalid";
  const nameInput = 'input[name="emaial"]';
  const passwordInput = "[name=passwd]";
  const submitButton = ".button";


  const emailInvalidMessage = "enter valid email";
  const emailBlankMessage = "enter an email";
  const passwordInvalidMessage = "enter valid password";
  const passwordBlankMessage = "enter a password";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.viewport(viewportWidth, viewportHeight);
  });

  it("displays proper email validation erros if submitted form is blank ", () => {
    cy.get(submitButton).click();
    cy.get(emailBlankId).should(($error) => {
      expect($error).to.contain.text(emailBlankMessage);
    });
  });

  it("displays proper email validation errors if submitted form is partial ", () => {
    cy.get(nameInput).type(emailInvalid);
    cy.get(submitButton).click();
    cy.get(emailInvalidId).should(($error) => {
      expect($error).to.contain.text(emailInvalidMessage);
    });
  });

  it("displays proper password validation erros if submitted form is blank ", () => {
    cy.get(submitButton).click();
    cy.get(passwordBlankId).should(($error) => {
      expect($error).to.contain.text(passwordBlankMessage);
    });
  });

  it("displays proper password validation errors if submitted form is partial ", () => {
    cy.get(passwordInput).type(passwordInvalid);
    cy.get(submitButton).click();
    cy.get(passwordInvalidId).should(($error) => {
      expect($error).to.contain.text(passwordInvalidMessage);
    });
  });
});
