
describe("Error validations on Login page should be visible ", function () {
  const baseUrl = Cypress.env("baseUrl");
  const viewportWidth = Cypress.env("viewportWidth");
  const viewportHeight = Cypress.env("viewportHeight");

  const emailInvalid = "j#j.com";
  const passwordInvalid = "111";

  const emailInvalidId = "#email-invalid";
  const emailBlankId = "#email-blank";
  const passwordInvalidId = "#password-invalid";
  const passwordBlankId = "#password-blank";

  const emailInvalidMessage = "enter valid email";
  const emailBlankMessage = "enter an email";
  const passwordInvalidMessage = "enter valid password";
  const passwordBlankMessage = "enter a password";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.viewport(viewportWidth, viewportHeight);
  });

  it("displays proper validation erros if submitted form is blank ", () => {
    cy.get(".button").click();
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
  }
  )

  it("displays proper validation errors if submitted form is partial ", () => {
    cy.get('input[name="emaial"]').type(emailInvalid);
    cy.get("[name=passwd]").type(passwordInvalid);
    cy.get(".button").click();

    cy.get("#email-invalid").should(($error) => {
      expect($error).to.contain.text(emailInvalidMessage);
    });
    cy.get("#password-invalid").should(($error) => {
      expect($error).to.contain.text(passwordInvalidMessage);
    });
  });
});
