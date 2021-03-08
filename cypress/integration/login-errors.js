describe("Error validations on Login page should be visible ", function () {
    const baseUrl = Cypress.env("baseUrl");
    const viewportWidth = Cypress.env("viewportWidth");
    const viewportHeight = Cypress.env("viewportHeight");
  
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
  
    const emailBlankId = "#email-blank";
    const passwordBlankId = "#password-blank";
    const emailInvalidId = "#email-invalid";
    const passwordInvalidId = "#password-invalid";
    const emailInput = 'input[name="emaial"]';
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
  
    it("displays proper email validation errors if submitted form is blank ", () => {
      cy.get(submitButton).click();
      cy.get(emailBlankId).should(($error) => {
        expect($error).to.contain.text(emailBlankMessage);
      });
    });
  
      it("displays proper password validation errors if submitted form is blank ", () => {
        cy.get(submitButton).click();
        cy.get(passwordBlankId).should(($error) => {
          expect($error).to.contain.text(passwordBlankMessage);
        });
      });
  
    it("displays proper email validation errors if submitted form is partial ", () => {
      cy.get(emailInput).type(emailInvalid);
      cy.get(submitButton).click();
      cy.get(emailInvalidId).should(($error) => {
        expect($error).to.contain.text(emailInvalidMessage);
      });
    });
  
    it("displays proper password validation errors if submitted form is partial ", () => {
      cy.get(passwordInput).type(passwordInvalid);
      cy.get(submitButton).click();
      cy.get(passwordInvalidId).should(($error) => {
        expect($error).to.contain.text(passwordInvalidMessage);
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
  
  
  });
  