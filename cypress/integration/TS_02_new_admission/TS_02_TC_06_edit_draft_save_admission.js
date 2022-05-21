const { user1: randomUser1 } = require("../../fixtures/user");
describe("TS_02_TC_06 Edit residents information", () => {
  beforeEach(() => {
    cy.login("user", { cacheSession: false });
    cy.dashboardPageIsLoaded();
  });

  it("If some mandatory fields are missing, editing cannot be saved", () => {
    cy.get('div[data-test-id="in progress-column"]')
      .find("button[type='button']")
      .eq(0)
      .click();
    cy.get("input[data-test-id='resident_firstName']").clear();
    cy.get("input[data-test-id='resident_lastName']").clear();
    cy.get('button[data-test-id="editAdmissionButton"]').click();
    cy.get("#error-field-scroll-target-resident_firstName").should("exist");
    cy.get("#error-field-scroll-target-resident_lastName").should("exist");
  });

  it('Edit button is only available for admissions"In progress" and "Pre-Flight" state ', () => {
    cy.get('div[data-test-id="pre-flight-column"]')
      .find('button[data-test-id="EditedDraft-editPccPreflight"]')
      .should("exist");
    cy.get('div[data-test-id="in progress-column"]')
      .find("button[type='button']")
      .eq(0)
      .should("have.text", "Edit");
    cy.get('div[data-test-id="signed-column"]')
      .find("button[type='button']")
      .eq(0)
      .should("not.have.text", "Edit");
    cy.get('div[data-test-id="approved-column"]')
      .find("button[type='button']")
      .eq(0)
      .should("not.have.text", "Edit");
  });
});
