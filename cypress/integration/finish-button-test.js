
describe("determine finish button and pop up indicator", function () {

  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    const baseUrl = Cypress.env("baseUrl");
    cy.visit(baseUrl);

    // it is ok for the email to be visible in the Command Log
    expect(email, "email was set").to.be.a("string").and.not.be.empty;
    // but the password value should not be shown
    if (typeof password !== "string" || !password) {
      throw new Error("Missing password value, set using CYPRESS_password=...");
    }

    cy.get('input[name="emaial"]')
      .type(email)
      .should("have.value", email);


    cy.get("[name=passwd]")
      .type(password, { log: false })
      .should(el$ => {
        if (el$.val() !== password) {
          throw new Error("Different value of typed password");
        }
      });

    cy.get(".button").click();
    cy.location("pathname").should("eq", "/");
  });

  it("start test", () => {
    const value = 1;

    cy.get(".buttons > :nth-child(1) > .button-inner").click();
    // finds and fills assessment name field
    cy.get("#assessment-name-input").type("test").should("have.value", "test");
    //  sets Target MRL from dropdown menu to value
    cy.get("#target-mrl-select").select(`${value}`).should("have.value", `${value}`);
    // finds Level Switching to be false
    cy.get("#level-switching-select > option[value='false']").should("have.value", "false");
    // sets Level Switching to be on
    cy.get("#level-switching-select ").select("On");
    // finds and clicks start button
    cy.get("#assessment-start > .button-inner").click();


    // first time
    let qArr;
    let qPos;
    let qFinish;

    //Initial run so we have access to question # in set
    cy.get("#select-answer").select("Yes");
    cy.get("#likelihood-input").select("1");
    cy.get("#consequence-input").select("1");
    cy.get("#impact-input").select("Cost");
    cy.get("#response-input").select("Accept");
    cy.get(".nav-q-buttons > #next-skip-button > .button-inner").click();

    cy.get("#question-number-in-set").then(($q) => {
      {force: true;}
      cy.log($q.text());
      qArr = $q.text().match(/\d+/g); // [2,5]
      qPos = qArr[0];
      qFinish = qArr[1];
    });

    //question form
    const formLoop = () => {
      cy.get("#select-answer").select("Yes");
      cy.get("#likelihood-input").select("1");
      cy.get("#consequence-input").select("1");
      cy.get("#impact-input").select("Cost");
      cy.get("#response-input").select("Accept");
      cy.get(".nav-q-buttons > #next-skip-button > .button-inner").click();
      qPos++;
    };

    cy.get("ion-nav").within(($page) => {
      while (qPos < qFinish - 1) {
        formLoop();
      }
      // Last run
      formLoop();
      if (qPos == qFinish) {
        cy.on("window:alert", cy.stub().as("alert"));
        cy.get("#finish-button > .button-inner").click();
        cy.get("@alert").should(
          "have.been.calledWithExactly",
          "You have finished the assesment"
        );
      }
    });
  })
});



