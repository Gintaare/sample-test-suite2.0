export class deleteAdmission {
  deleteAdmission(selector) {
    cy.get(selector)
      .contains("Admission ID:")
      .eq(0)
      .invoke("text")
      .as("admission_ID");
    cy.get(selector).find("button[type='button']").eq(1).click();
    cy.contains("Delete").click();
    cy.contains("Completed Manual").should("exist");
    cy.contains("Refused to sign via RESIDE").should("exist");
    cy.contains("Transferred").should("exist");
    cy.contains("Discharged").should("exist");
    cy.contains("Expired").should("exist");
    cy.contains("Duplicate Admission").should("exist");
    cy.contains("Test Admission").should("exist");
    cy.contains("Completed Manual").click();
    cy.get('button[data-test-id="deleteAdmissionButton"]').click();
    cy.alertMessage("Admission was successfully deleted.");
    cy.get('div[class="css-1leatb5 ReactModal__Scrollable"]').should(
      "not.exist"
    );
    cy.wait(3000);
    cy.get("@admission_ID").then((admission_ID) => {
      cy.get(selector)
        .contains("Admission ID:")
        .eq(0)
        .invoke("text")
        .should("not.include", admission_ID);
    });
  }
}

export const ondeleteAdmission = new deleteAdmission();
