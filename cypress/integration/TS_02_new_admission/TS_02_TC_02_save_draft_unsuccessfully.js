const { user1: randomUser1 } = require("../../fixtures/user");

beforeEach(() => {
  cy.login("user", { cacheSession: false });
  cy.dashboardPageIsLoaded();
});

describe("TS_02_TC_02 Save a draft (unsuccessfully)", () => {
  it("The user is not able to save a draft with empty fields", () => {
    cy.chooseFacility();
    cy.get("button[data-test-id='saveDraftButton']").click();
    cy.contains("This field is required").should("exist");
  });

  it("The user is not able to save a draft if first or last name is missing", () => {
    cy.chooseFacility();
    cy.get("input[data-test-id='resident_lastName']").type(
      randomUser1.firstName
    );
    cy.get("button[data-test-id='saveDraftButton']").click();
    cy.contains("This field is required.").should("exist");
  });
});
