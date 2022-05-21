const { user1: randomUser1 } = require("../../fixtures/user");

describe("TS_03_TC_02 Unsuccessful login", () => {
  // beforeEach(() => {
  //   cy.login("user", { cacheSession: false });
  //   cy.dashboardPageIsLoaded();
  // });

  it("After 5th failed attempt the link get expired", () => {
    cy.login("user", { cacheSession: false });
    cy.dashboardPageIsLoaded();
    cy.get('div[data-test-id="in progress-column"]')
      .find("button[type='button']")
      .eq(1)
      .click();
    cy.contains("Start Resident Experience").click();
    cy.contains("Activate Magic Link/QR Code").click();
    cy.get('button[data-test-id^="loginLink"]')
      .invoke("data", "test-id")
      .then((d) => d.replace("loginLink-", ""))
      .as("magicLink");
    cy.get("@magicLink").then((l) => cy.visit(l));

    for (let n = 0; n < 5; n++) {
      cy.get('input[data-test-id="resident_firstName"]').clear();
      cy.get('input[data-test-id="resident_firstName"]').type(
        randomUser1.firstName
      );
      cy.get('input[data-test-id="resident_lastName"]').clear();
      cy.get('input[data-test-id="resident_lastName"]').type(
        randomUser1.lastName
      );
      cy.get(
        'input[data-test-id="datepicker-input-resident_dateOfBirth"]'
      ).type(
        randomUser1.dob.year +
          "-" +
          randomUser1.dob.day2 +
          "-" +
          randomUser1.dob.day3
      );

      cy.contains("Continue with Admission").click({ force: true });
    }
    cy.alertMessage(
      "Reached max attempts to enter admission. Please request new login link."
    );

    cy.get("@magicLink").then((l) => cy.visit(l));
    cy.alertMessage("Your link has expired. Please request a new login link.");
  });
});
