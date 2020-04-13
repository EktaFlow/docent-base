describe("determine MR Level is same as Target MRL", function() {
  const email = Cypress.env("email");
  const password = Cypress.env("password");
  const baseUrl = Cypress.env("baseUrl");
  const viewportWidth = Cypress.env("viewportWidth");
  const viewportHeight = Cypress.env("viewportHeight");
  const mrLevel = 9;

  // New assessment vars
  const startNewButton = ".buttons > :nth-child(1) > .button-inner";
  const assessmentNameField = "#assessment-name-input";
  const mrlDropdown = "#target-mrl-select";
  const levelSwitchDropdown = "#level-switching-select";
  const mainAssessmentStartButton = "#assessment-start > .button-inner";
  const currentMrlLevel = ".desktop > #open-thread-popover";
  const targetMrlLevel = ".targets-scope > :nth-child(1)";

  const beginNewAssesment = () => {
    cy.get(startNewButton).click();
    cy.get(assessmentNameField).type("test");
    cy.get(mrlDropdown).select(`${mrLevel}`);
    cy.get(levelSwitchDropdown).select("On");
    cy.get(mainAssessmentStartButton).click();
  };

  beforeEach(() => {
    cy.viewport(viewportWidth, viewportHeight);
    cy.visit(baseUrl);
    cy.login(email, password);
  });

  it("compares target to current mrl", () => {
    let targetMrl;
    let mrLevel;
    let findElementNumberRegex = /\d+/g;

    beginNewAssesment();

    cy.get(currentMrlLevel).should($element => {
      expect($element).to.contain.text(`Current MR Level: ${mrLevel}`);
      mrLevel = $element.text().match(findElementNumberRegex)[0];
    });

    cy.get(targetMrlLevel).should(($target) => {
      expect($target).to.contain.text(`Target MRL: ${mrLevel}`);
      targetMrl = $target.text().match(findElementNumberRegex)[0];
      expect(mrLevel).to.equal(targetMrl);
    });
    });
  });
