const { user1: randomUser1 } = require("../../fixtures/user");

describe("TS_03_TC_05 Request new login links for inactive admissions ", () => {
  beforeEach(() => {
    cy.login("user", { cacheSession: false });
    cy.dashboardPageIsLoaded();
  });

  it("The email of pre-flight admission should not work", () => {
    cy.get('div[data-test-id="pre-flight-column"]')
      .find("button[type='button']")
      .eq(0)
      .click();
    cy.get("input[data-test-id='resident_email']")
      .clear()
      .type(randomUser1.email);

    cy.get("input[data-test-id='resident_email']").invoke("val").as("email");
    cy.get("button[data-test-id='editDraftButton']").click();
    cy.visit("/admission/welcome");
    cy.get("@email").then((emailText) => {
      console.log(emailText);
      cy.get('input[data-test-id="email"]').type(emailText);
    });
    cy.get('button[data-test-id="sendLoginLinkButton"]').click();

    cy.get("div.s-alert-wrapper", { timeout: 50000 }).should(
      "contain",
      "The email address you have entered doesn't match any account, please contact your Admission Representative."
    );
  });

  it("The email of a deleted admission should not work", () => {
    cy.get('div[data-test-id="in progress-column"]')
      .find("button[type='button']")
      .eq(0)
      .click();
    cy.get("input[data-test-id='resident_email']")
      .clear()
      .type(randomUser1.email);
    cy.get("input[data-test-id='resident_email']").invoke("val").as("email");
    cy.get("button[data-test-id='editAdmissionButton']").click();
    cy.visit("/admin/dashboard");
    cy.get('div[data-test-id="in progress-column"]')
      .find("button[type='button']")
      .eq(1)
      .click();
    cy.contains("Delete").click();
    cy.get('input[data-test-id="radio-reason-Completed Manual"]').check({
      force: true,
    });
    cy.get('button[data-test-id="deleteAdmissionButton"]').click();

    cy.alertMessage("Admission was successfully deleted.");
    cy.visit("/admission/welcome");
    cy.get('input[data-test-id="email"]').type(randomUser1.email);
    cy.get('button[data-test-id="sendLoginLinkButton"]').click();
    cy.alertMessage(
      "The email address you have entered doesn't match any account, please contact your Admission Representative."
    );
  });
});
