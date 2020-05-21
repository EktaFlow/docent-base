
describe("Error validations on Registration page should be visible ", function () {
  const baseUrl = Cypress.env("baseUrl");
  const viewportWidth = Cypress.env("viewportWidth");
  const viewportHeight = Cypress.env("viewportHeight");

  const registerLink = "#register-link";
  const nameBlankId = "#registration-name-blank";
  const emailInvalidId = "#registration-email-invalid";
  const emailBlankId = "#registration-email-blank";
  const passwordBlankId = "#registration-password-blank";
  const passwordDuplicateId = "#registration-password-duplicate";
  const emailInput = 'input[name="emaial"]';
  const password1Id = "#pw1";
  const password2Id = "#pw2";
  const submitButton = ".button";
  const invalidEmailList = [
    "#@%^%#$@#$ @#.com",
    "@example.com",
    "Joe Smith < email@example.com>",
    "email.example.com",
    "email@example @example.com",
    ".email @example.com",
    "email.@example.com",
    "email..email@example.com",
    "あいうえお@example.com",
    "email@example.com(Joe Smith)",
    "email@example",
    "email@-example.com",
    "email@111.222.333.44444",
    "email@example..com",
    "Abc..123@example.com",
    '”(),: ;<>[\]@example.com',
    'just”not”right@example.com',
    'this\ is"really"not\allowed@example.com',
  ]


  const validEmailList = [
  'email@example.com',
  'firstname.lastname@example.com',
  'email@subdomain.example.com',
  'email@123.123.123.123',
  'email@example.com',
  '1234567890@example.com',
  'email@example-one.com',
  '_______@example.com',
  'email@example.co.jp',
  'firstname-lastname@example.com'
  ];


  const passwordInvalid = "111";
  const repeatPasswordInvalid = "222";

  const nameBlankMessage = "enter a name";
  const emailBlankMessage = "enter an email";
  const emailInvalidMessage = "enter a valid email";
  const passwordBlankMessage = "enter a password";
  const passwordNoMatchMessage = "passwords don't match";


  beforeEach(() => {
    cy.viewport(viewportWidth, viewportHeight);
    cy.visit(baseUrl);
    cy.get(registerLink).click();
  });

  it("displays proper validation errors for name if submitted form is blank ", () => {
    cy.get(submitButton).click();
    cy.get(nameBlankId).should(($error) => {
      expect($error).to.contain.text(nameBlankMessage);
    });
  });

  it("displays proper validation errors for email if submitted form is blank ", () => {
    cy.get(submitButton).click();
    cy.get(emailBlankId).should(($error) => {
      expect($error).to.contain.text(emailBlankMessage);
    });
  });

  it("displays proper validation errors for password if submitted form is blank ", () => {
    cy.get(submitButton).click();
    cy.get(passwordBlankId).should(($error) => {
      expect($error).to.contain.text(passwordBlankMessage);
    });
  });


  it("displays proper validation errors if email is invalid ", () => {
    const invalidEmailListLength = invalidEmailList.length;
    for (let i = 0; i < invalidEmailListLength; i++) {
      cy.get(emailInput).type(invalidEmailList[i]);
      cy.get(submitButton).click();
      cy.get(emailInvalidId).should(($error) => {
        expect($error).to.contain.text(emailInvalidMessage);
      });
    }
  });


  it("displays errors if email is valid", () => {
    const validEmailListLength = validEmailList.length;
    for (let i = 0; i < validEmailListLength; i++) {
      cy.get(emailInput).type(validEmailList[i]);
      cy.get(submitButton).click();
      cy.get(emailInvalidId).should(($error) => {
        expect($error).not.to.contain.text(emailInvalidMessage);
      });
      cy.get(emailInput).clear();
    }
  });

  it("displays proper validation errors for password if submitted form is partial ", () => {
    cy.get(password1Id).type(passwordInvalid);
    cy.get(password2Id).type(repeatPasswordInvalid);
    cy.get(submitButton).click();
    cy.get(passwordDuplicateId).should(($error) => {
      expect($error).to.contain.text(passwordNoMatchMessage);
    });
  });

});
