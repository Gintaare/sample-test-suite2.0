const { user1: randomUser1 } = require("../../fixtures/user");
import { oncreatingShortexAdmission } from "../../support/page_objects/creatingShortexAdmission";

describe(" TS_05_TC_01 Add new flags", () => {
  it("Resident is able to add a flag", () => {
    cy.login("user", { cacheSession: false });
    cy.dashboardPageIsLoaded();
    oncreatingShortexAdmission.creatingShortexAdmission();
    cy.get('div[data-test-id="in progress-column"]')
      .find("button[type='button']")
      .eq(1)
      .click();
    cy.openMagicLink();
    cy.submitCredentials(randomUser1.firstName, randomUser1.lastName);
    cy.clickStartAdmissionButton();
    cy.get('input[data-test-id="radio-representative_role-RESIDENT"]').check({
      force: true,
    });
    cy.get('button[type="submit"]').click({ force: true });
    cy.contains("Continue").click();
    var i = 0;
    for (i = 0; i < 4; i++) {
      cy.addFlag();
      cy.get('div[data-test-id="scrollableArea"]').scrollTo("bottom");
      cy.clickAccept();
    }
  });

  it("User is able to remove the flag", () => {
    cy.get('button[data-test-id="go-back-button"]').click();
    cy.get('button[data-test-id="open-help-button"]').click({ force: true });
    cy.get('button[data-test-id="remove-flag-button"]').click({ force: true });
    cy.alertMessage("Your comment was successfully removed!");
  });

  it("The number of flags is displayed in the dashboard", () => {
    cy.login("user", { cacheSession: false });
    cy.dashboardPageIsLoaded();
    cy.get('div[data-test-id="in progress-column"]')
      .find(".css-1wekm2g")
      .eq(0)
      .should("contain", "3");
  });
});
