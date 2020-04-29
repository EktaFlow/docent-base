
describe("Error validations on Registration page should be visible ", function () {
  const baseUrl = Cypress.env("baseUrl");
  const viewportWidth = Cypress.env("viewportWidth");
  const viewportHeight = Cypress.env("viewportHeight");

  const registerLink = "#register-link";
  const nameBlankId = "#registration-name-blank";
  const emailInvalidId = "#registration-email-invalid";
  const emailBlankId = "#registration-email-blank";
  const passwordInvalidId = "#registration-password-invalid";
  const passwordBlankId = "#registration-password-blank";
  const passwordDuplicateId = "#registration-password-duplicate";

  const namePartial = "j";
  const emailInvalid = "j#j.com";
  const passwordInvalid = "111";
  const repeatPasswordInvalid = "222";

  const nameBlankMessage = "enter a name";
  const emailBlankMessage = "enter an email";
  const emailInvalidMessage = "enter a valid email";
  const passwordBlankMessage = "enter a password";
  const passwordInvalidMessage = "enter a valid password";
  const passwordNoMatchMessage = "passwords don't match";

  beforeEach(() => {
    cy.viewport(viewportWidth, viewportHeight);
    cy.visit(baseUrl);
    cy.get(registerLink).click();
  });

  it("displays proper validation erros if submitted form is blank ", () => {
    cy.get(".button").click();
    cy.get(nameBlankId).should(($error) => {
      expect($error).to.contain.text(nameBlankMessage);
    });
    cy.get(emailBlankId).should(($error) => {
      expect($error).to.contain.text(emailBlankMessage);
    });
    cy.get(emailInvalidId).should(($error) => {
      expect($error).to.contain.text(emailInvalidMessage);
    });
    cy.get(passwordBlankId).should(($error) => {
      expect($error).to.contain.text(passwordBlankMessage);
    });
    cy.get(passwordInvalidId).should(($error) => {
      expect($error).to.contain.text(passwordInvalidMessage);
    });
  });

  it("displays proper validation errors if submitted form is partial ", () => {
    cy.get('input[name="name"]').type(namePartial);
    cy.get('input[name="emaial"]').type(emailInvalid);
    cy.get('#pw1').type(passwordInvalid);
    cy.get('#pw2').type(repeatPasswordInvalid);
    cy.get(".button").click();

    cy.get(emailInvalidId).should(($error) => {
      expect($error).to.contain.text(emailInvalidMessage);
    });
    cy.get(passwordDuplicateId).should(($error) => {
      expect($error).to.contain.text(passwordNoMatchMessage);
    });
  });
});
