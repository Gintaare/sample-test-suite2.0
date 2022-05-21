import { ondeleteAdmission } from "../../support/page_objects/deleteAdmission";
describe(" TS_08_TC_01-02 Delete admission", () => {
  it("Admission cannot be deleted without picking reason", () => {
    cy.login("user", { cacheSession: false });
    cy.dashboardPageIsLoaded();
    cy.get('button[data-test-id="archiveAdmissionDismissButton"]').click();
    cy.get('div[data-test-id="in progress-column"]')
      .contains("Admission ID:")
      .eq(0)
      .invoke("text")
      .as("admission_ID");
    cy.get('div[data-test-id="pre-flight-column"]')
      .find("button[type='button']")
      .eq(1)
      .click();
    cy.get('button[data-test-id="deleteAdmissionButton"]').click();
    cy.get('div[data-test-id="field-error-reason"]').should(
      "contain",
      "This field is required."
    );
  });

  it("There are 9 reasons to delete admission in PRE FLIGHT column", () => {
    cy.contains("Completed Manual").should("exist");
    cy.contains("Refused to sign via RESIDE").should("exist");
    cy.contains("Transferred").should("exist");
    cy.contains("Discharged").should("exist");
    cy.contains("Expired").should("exist");
    cy.contains("Duplicate Admission").should("exist");
    cy.contains("Test Admission").should("exist");
    cy.contains("Did Not Admit").should("exist");
  });

  it("The user is able to delete admission PRE FLIGHT", () => {
    cy.contains("Completed Manual").click();
    cy.get('button[data-test-id="deleteAdmissionButton"]').click();
    cy.alertMessage("Admission was successfully deleted.");
    cy.contains("Admission was successfully sent to resident.").should(
      "not.exist"
    );
  });

  it("The user is able to delete admission IN PROGRESS", () => {
    ondeleteAdmission.deleteAdmission("div[data-test-id='in progress-column']");
  });

  it("The user is able to delete admission SIGNED", () => {
    ondeleteAdmission.deleteAdmission('div[data-test-id="signed-column"]');
  });

  it("The user is able to delete admission APPROVED ", () => {
    ondeleteAdmission.deleteAdmission('div[data-test-id="approved-column"]');
  });

  it("Deleted admission can by find in admission tab ", () => {
    cy.get('div[data-test-id="approved-column"]')
      .contains("Admission ID:")
      .eq(0)
      .invoke("text")
      .then((d) => d.replace("Admission ID: ", ""))
      .as("admission_ID");
    cy.get('div[data-test-id="approved-column"]')
      .find("button[type='button']")
      .eq(1)
      .click();
    cy.contains("Delete").click();
    cy.contains("Completed Manual").click();
    cy.get('button[data-test-id="deleteAdmissionButton"]').click();
    cy.alertMessage("Admission was successfully deleted.");
    cy.wait(2500);
    cy.get("@admission_ID").then((admission_ID) => {
      cy.get('a[data-test-id="admissionsLink"]').click();
      cy.get('input[data-test-id="search-box"]').type(admission_ID);
    });
    cy.get(".dropdown-0-29").click();
    cy.contains("Deleted").should("exist");
  });
});
