const { user1: randomUser1 } = require("../../fixtures/user");

describe("TS_03_TC_01 Successful login", () => {
  // beforeEach(() => {
  //   cy.login("user", { cacheSession: false });
  //   cy.dashboardPageIsLoaded();
  // });

  it("Magic link is generated", () => {
    cy.login("user", { cacheSession: false });
    cy.createNewAdmission();
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
  });

  it("Credentials are mandotory to fill", () => {
    cy.contains("Continue with Admission").click({ force: true });
    cy.get("div[data-test-id='field-error-resident_firstName']")
      .contains("This field is required.")
      .should("exist");
    cy.get("div[data-test-id='field-error-resident_lastName']")
      .contains("This field is required.")
      .should("exist");
    cy.get("div[data-test-id='field-error-resident_dateOfBirth']")
      .contains("This field is required.")
      .should("exist");
  });

  it("The resident successfully logged-in", () => {
    cy.get('input[data-test-id="resident_firstName"]').type("Caperucita");
    cy.get('input[data-test-id="resident_lastName"]').type("Roja");
    cy.get('input[data-test-id="datepicker-input-resident_dateOfBirth"]').type(
      "1111-11-11"
    );
    cy.contains("Continue with Admission").click({ force: true });
    cy.url().should("include", "/prelude");
  });

  it("Refresh the page - the user stays logged-in", () => {
    cy.reload();
    cy.url().should("include", "/prelude");
  });

  it("Log out button is working", () => {
    cy.get('input[data-test-id="radio-representative_role-RESIDENT"]').check({
      force: true,
    });
    cy.get('button[type="submit"]').click({ force: true });
    cy.contains("Continue").click();
    cy.contains("Pause").click();
    cy.contains("Logout").click();
    cy.url().should("include", "/admission/welcome");
  });

  it("Go back button does not relog-in the user", () => {
    cy.go("back");
    cy.url().should("include", "/admission/welcome");
  });
});
