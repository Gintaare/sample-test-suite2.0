const { user1: randomUser1 } = require("../../fixtures/user");

describe("TS_02_TC_05 Send admission to resident", () => {
  it("Resend button does not exist for admission without email", () => {
    cy.createNewAdmissionWithoutEmails();
    cy.get('div[data-test-id="in progress-column"]')
      .find('button[type="button"]')
      .eq(1)
      .click()
      .should("not.contain", "Resend Email");
    cy.contains("Admission was successfully sent to resident.").should(
      "not.exist"
    );
  });

  it("Resend email button is working", () => {
    cy.get('div[data-test-id="in progress-column"]')
      .find("button[type='button']")
      .eq(0)
      .click();
    cy.url("include", "admin/facility/");
    cy.get("input[data-test-id='resident_email']")
      .clear()
      .type(Cypress.env("residentNewEmail"));
    cy.wait(250);
    cy.get('button[data-test-id="editAdmissionButton"]').click();
    cy.alertMessage("Admission data was saved successfully.");
    cy.contains("Admission data was saved successfully.").should("not.exist");

    cy.go("back");
    cy.get('div[data-test-id="in progress-column"]').should(
      "contain",
      "less than a minute ago"
    );
    cy.wait(120000);
    cy.get('div[data-test-id="in progress-column"]')
      .find('button[type="button"]')
      .eq(1)
      .click();
    cy.contains("Resend Email").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        "This will send an email notification to the Resident and/or Resident Representative."
      );
      return true;
    });
    cy.alertMessage("Email has been successfully sent.");
  });

  it("Resend email button cannot be clicked more than once during 2 min", () => {
    var i = 0;
    for (i = 0; i < 2; i++) {
      cy.get('div[data-test-id="in progress-column"]')
        .find('button[type="button"]')
        .eq(1)
        .click();
      cy.contains("Resend Email").click();
      cy.on("window:alert", (str) => {
        expect(str).to.equal(
          "This will send an email notification to the Resident and/or Resident Representative."
        );
        return true;
      });
    }
    cy.alertMessage(
      "You can send this email notification only once every 2 minutes, please try again later"
    );
  });

  it.skip("Representative recieves an email", () => {});
});
