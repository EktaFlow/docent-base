
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
  const nameInput = 'input[name="name"]';
  const emailInput = 'input[name="emaial"]';
  const password1Id = "#pw1";
  const password2Id = "#pw2";
  const submitButton = ".button";

  const emailJoinSymbolList = ['%', '@', '&', '*', '$', ''];

  randomEmailGenerator = (size) => {
    for (a = '', b = 36; a.length < size;) a += (Math.random() * b | 0).toString(b)
    return a;
  }

  randomNumberGenerator = () => {
    let random = parseInt(Math.random() * 10, 10)
    if (random === 0) {
      randomNumberGenerator()
    }
    return random;
  }

  emailGenerator = () => {
    let email = '';
    let randomNess = randomEmailGenerator(randomNumberGenerator());
    let secondPart = shuffle(emailJoinSymbolList)[0];
    email.concat(randomNess + secondPart + randomNess + "." + 'com')
    console.log(email);

    return email;
  }





  let emailInvalid = emailGenerator();

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

  it("displays proper validation errors for email if submitted form is partial ", () => {

    cy.get(emailInput).type(emailInvalid);
    cy.get(submitButton).click();

    cy.get(emailInvalidId).should(($error) => {
      expect($error).to.contain.text(emailInvalidMessage);
    });
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
