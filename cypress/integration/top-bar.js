// auto complete from cypress
/// <reference types="cypress" />

describe("determine MR Level is same as Target MRL", function() {
  const value = 9;

  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.visit("localhost:8100");

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

  it("clicks Start New", () => {
    let targetMrl;
    let mrLevel;

    cy.get(".buttons > :nth-child(1) > .button-inner").click();

    // finds and fills assessment name field
    cy.get("#assessment-name-input")
      .type("test")
      .should("have.value", "test");

    //  sets Target MRL from dropdown menu to value
    cy.get("#target-mrl-select")
      .select(`${value}`)
      .should("have.value", `${value}`);

    // finds Level Switching to be false
    cy.get("#level-switching-select > option[value='false']").should(
      "have.value",
      "false"
    );

    // sets Level Switching to be on
    cy.get("#level-switching-select ").select("On");

    // finds and clicks start button
    cy.get("#assessment-start > .button-inner").click();

    // finds and validates MR Level to be ${value}
    cy.get(".desktop > #open-thread-popover").should($s => {
      expect($s).to.contain.text(`Current MR Level: ${value}`);
      mrLevel = $s
      .text()
      .match(/\d+/g)[0];
    });

    // finds and validates Target MRL to be ${value}
    cy.get(".targets-scope > :nth-child(1)").should($p => {
      expect($p).to.contain.text(`Target MRL: ${value}`);

      targetMrl = $p
        .text()
        .match(/\d+/g)[0]

        expect(mrLevel).to.equal(targetMrl);
    });

    });
  });

