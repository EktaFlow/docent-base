///
/// TODO: Create clean up function to delete assessment after testing
///

describe("determine finish button and pop up indicator", function () {
  const email = Cypress.env("email");
  const password = Cypress.env("password");
  const baseUrl = Cypress.env("baseUrl");
  const viewportWidth = Cypress.env("viewportWidth");
  const viewportHeight = Cypress.env("viewportHeight");

  ///
  /// TODO: Randomize mrLevel variable through given assessment mrLevels
  ///
  const mrLevel = 1;

  // New assessment vars
  const startNewButton = ".buttons > :nth-child(1) > .button-inner";
  const assessmentNameField = "#assessment-name-input";
  const mrlDropdown = "#target-mrl-select";
  const levelSwitchDropdown = "#level-switching-select";
  const mainAssessmentStartButton = "#assessment-start > .button-inner";

  // Question page form vars
  const selectAnswer = "#select-answer";
  const likelihoodInput = "#likelihood-input";
  const consequenceInput = "#consequence-input";
  const impactInput = "#impact-input";
  const responseInput = "#response-input";
  const questionPageNextButton = ".nav-q-buttons > #next-skip-button > .button-inner";
  const questionNumberInSet = "#question-number-in-set";
  const mainPageNavWrapper = "ion-nav";
  const finishButton = "#finish-button > .button-inner";

  const beginNewAssesment = () => {
    cy.get(startNewButton).click();
    cy.get(assessmentNameField).type("test");
    cy.get(mrlDropdown).select(`${mrLevel}`);
    cy.get(levelSwitchDropdown).select("On");
    cy.get(mainAssessmentStartButton).click();
  }

  const questionFormBlock = () => {
    cy.get(selectAnswer).select("Yes");
    cy.get(likelihoodInput).select("1");
    cy.get(consequenceInput).select("1");
    cy.get(impactInput).select("Cost");
    cy.get(responseInput).select("Accept");
    cy.get(questionPageNextButton).click();
  };

  beforeEach(() => {
    cy.viewport(viewportWidth, viewportHeight);
    cy.visit(baseUrl);
    cy.login(email,password);
  });

  it("validates completion of assessment", () => {

    let questionArray = [];
    let questionPosition;
    let lastQuestion;
    let findQuestionNumberRegex = /\d+/g;

    const getTestQuestionLoopVars = () => {
      cy.get(questionNumberInSet).then(($questionDisplay) => {
        { force: true; }
        questionArray = $questionDisplay.text().match(findQuestionNumberRegex);
        questionPosition = questionArray[0];
        lastQuestion = questionArray[1];
      });
    }

    beginNewAssesment();
    questionFormBlock();
    questionPosition++;
    getTestQuestionLoopVars()

    cy.get(mainPageNavWrapper).within((_) => {
      while (questionPosition < lastQuestion) {
        questionFormBlock();
        questionPosition++;
      }
      if (questionPosition == lastQuestion) {
        cy.on("window:alert", cy.stub().as("alert"));
        cy.get(finishButton).click();
        cy.get("@alert").should(
          "have.been.calledWithExactly",
          "You have finished the assesment"
        );
      }
    });
  })
});



