const { user1: randomUser1 } = require("../../fixtures/user");
import { oncreatingShortexAdmission } from "../../support/page_objects/creatingShortexAdmission";
import { onfillingShortexAdmission } from "../../support/page_objects/creatingShortexAdmission";

describe(" TS_07_01-04 Admission cycle", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });
  it("Shortex admission is created", () => {
    cy.login("user", { cacheSession: false });
    cy.dashboardPageIsLoaded();
    oncreatingShortexAdmission.creatingShortexAdmission();
  });

  it("Shortex admission is signed by resident", () => {
    cy.get('div[data-test-id="in progress-column"]')
      .find("button[type='button']")
      .eq(1)
      .click();
    cy.openMagicLink();

    cy.get('input[data-test-id="resident_firstName"]').type(
      randomUser1.firstName
    );
    cy.get('input[data-test-id="resident_lastName"]').type(
      randomUser1.lastName
    );
    cy.get('input[data-test-id="datepicker-input-resident_dateOfBirth"]').type(
      "1111-11-11"
    );
    cy.clickStartAdmissionButton();
    onfillingShortexAdmission.fillingShortexAdmission();
  });

  it("Admission can be return to resident", () => {
    cy.login("user", { cacheSession: false });
    cy.dashboardPageIsLoaded();
    cy.get('button[data-test-id="archiveAdmissionDismissButton"]').click();

    cy.get('div[data-test-id="signed-column"]')
      .find('a[href*="/admin/admissions"]')
      .eq(0)
      .should("contain", randomUser1.lastName);
    cy.get('div[data-test-id="signed-column"]')
      .find("button[type='button']")
      .eq(1)
      .click();
    cy.contains("Return to Resident").click();
    cy.get('button[data-test-id="submitReturnToResidentButton"]').click();
    cy.alertMessage("Admission was successfully returned to resident.");
    cy.get('div[class="css-1leatb5 ReactModal__Scrollable"]').should(
      "not.exist"
    );
    cy.wait(150);

    cy.get('div[data-test-id="in progress-column"]')
      .contains(randomUser1.firstName + " " + randomUser1.lastName)
      .should("exist");
  });

  it("Resident is able to re-sign admission", () => {
    cy.get('div[data-test-id="in progress-column"]')
      .find("button[type='button']")
      .eq(1)
      .click();
    cy.openMagicLink();
    cy.get('input[data-test-id="resident_firstName"]').type(
      randomUser1.firstName
    );
    cy.get('input[data-test-id="resident_lastName"]').type(
      randomUser1.lastName
    );
    cy.get('input[data-test-id="datepicker-input-resident_dateOfBirth"]').type(
      "1111-11-11"
    );
    cy.clickStartAdmissionButton();
    cy.get('input[data-test-id="radio-representative_role-RESIDENT"]').check({
      force: true,
    });
    cy.get('button[type="submit"]').click({ force: true });
    cy.scrollDownAdmission();
    cy.get('button[data-test-id="continueButton"]').click({ force: true });
    cy.scrollDownAdmission();
    cy.get('button[data-test-id="sign-confirm-button"]').click({ force: true });

    cy.contains("Congratulations!").should("exist");
  });

  it("User is not able to approve admission if mandotory fields are missing", () => {
    cy.login("user", { cacheSession: false });
    cy.dashboardPageIsLoaded();
    cy.get('div[data-test-id="signed-column"]')
      .find('a[href*="/admin/admissions"]')
      .eq(0)
      .should("contain", randomUser1.lastName);
    cy.get('div[data-test-id="signed-column"]')
      .find("button[type='button']")
      .contains("Approve")
      .click();
    cy.get('button[data-test-id="submitAdmissionButton"]').click();
    cy.get('div[data-test-id="field-error-approverTitle"]').should("exist");
    cy.get('div[data-test-id="field-error-signature"]').should("exist");
  });

  it("User is able to approve admission", () => {
    cy.get('select[data-test-id="approverTitle"]').select(
      "Admissions Director"
    );
    cy.putSignatureApproval();
    cy.get('button[data-test-id="submitAdmissionButton"]').click();
    cy.alertMessage("Admission was successfully approved.");
    cy.get('div[data-test-id="approved-column"]', { timeout: 1000 }).should(
      "contain",
      randomUser1.lastName
    );
  });
  it("Appproval eminder should exist", () => {
    cy.get('button[data-test-id="archiveAdmissionDismissButton"]')
      .should("exist")
      .click();
    cy.get('button[data-test-id="archiveAdmissionDismissButton"]').should(
      "not.exist"
    );
  });

  it("User is able to archive admission", () => {
    cy.get('div[data-test-id="approved-column"]')
      .find("button[type='button']")
      .contains("Archive")
      .eq(0)
      .click();
    cy.contains(randomUser1.firstName + " " + randomUser1.lastName).should(
      "exist"
    );
    cy.get('div[class="css-1leatb5 ReactModal__Scrollable"]')
      .find('button[type="button"]')
      .contains("Archive")
      .click();
    cy.get('div[class="css-1leatb5 ReactModal__Scrollable"]').should(
      "not.exist"
    );
    cy.alertMessage("Admission was successfully archived.");
    cy.get('div[data-test-id="approved-column"]')
      .contains(randomUser1.firstName + " " + randomUser1.lastName)
      .should("not.exist");
  });
});
