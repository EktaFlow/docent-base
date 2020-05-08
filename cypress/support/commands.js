
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  expect(email, "email was set").to.be.a("string").and.not.be.empty;
  cy.get('input[name="emaial"]').type(email);
  cy.get("[name=passwd]").type(password, { log: false });
  cy.get(".button").click();
});
//


// Cypress.Commands.add("emailGen", () => {
//   const emailJoinSymbolList = ['%', '@', '&', '*', '$', ''];

//   randomEmailGenerator = (size) => {
//     for (a = '', b = 36; a.length < size;) a += (Math.random() * b | 0).toString(b)
//     return a;
//   }

//   randomNumberGenerator = () => {
//     let random = parseInt(Math.random() * 10, 10)
//     if (random === 0) {
//       randomNumberGenerator()
//     }
//     return random;
//   }

//   emailGenerator = () => {
//     let email = '';
//     let randomNess = randomEmailGenerator(randomNumberGenerator());
//     let secondPart = shuffle(emailJoinSymbolList)[0];
//     email.concat(randomNess + secondPart + randomNess + "." + 'com')
//     return email;
//   }

//   emailGenerator();
// });
//

// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

