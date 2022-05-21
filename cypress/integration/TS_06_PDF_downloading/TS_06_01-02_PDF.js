describe(" TS_06_TC_01-02 Download PDF button", () => {
  it("Download PDF button exists for admissions IN PROGRESS column", () => {
    cy.login("user", { cacheSession: false });
    cy.dashboardPageIsLoaded();
    cy.get('button[data-test-id="archiveAdmissionDismissButton"]').click();

    cy.get('div[data-test-id="in progress-column"]')
      .find("button[type='button']")
      .eq(1)
      .click();
    cy.contains("Download PDF").should("exist");
  });

  it("Download PDF button exists for admissions IN SIGNED column", () => {
    cy.get('div[data-test-id="signed-column"]')
      .find("button[type='button']")
      .contains("Approve")
      .click();
    cy.contains("Open Admission PDF preview.").should("exist");
    cy.contains("Close").click();
  });

  it("Download PDF button exists for admissions APPROVED column", () => {
    cy.get('div[data-test-id="in progress-column"]')
      .find("button[type='button']")
      .eq(1)
      .click();
    cy.contains("Download PDF").should("exist");
  });

  it("Download PDF button exists for APPROVED admissions in admissions tab", () => {
    cy.get('[data-test-id="admissionsLink"]').click();
    cy.get("tr")
      .filter(':contains("Approved")')
      .eq(0)
      .find("td")
      .eq(9)
      .find(".icon")
      .click("center", { force: true });
    cy.contains("Download PDF").should("exist");
  });

  it("Download PDF button exists for IN PROGRESS admissions in admissions tab", () => {
    cy.get("tr")
      .filter(':contains("In Progress")')
      .eq(0)
      .find("td")
      .eq(9)
      .find(".icon")
      .click("center", { force: true });
    cy.contains("Download PDF").should("exist");
  });

  it("Download PDF button exists for DELETED admissions in admissions tab", () => {
    cy.get("tr")
      .filter(':contains("Deleted")')
      .eq(0)
      .find("td")
      .eq(9)
      .find(".icon")
      .click("center", { force: true });
    cy.contains("Download PDF").should("exist");
  });

  it("Download PDF button exists for ARCHIVED admissions in admissions tab", () => {
    cy.get("tr")
      .filter(':contains("Archived")')
      .eq(0)
      .find("td")
      .eq(9)
      .find(".icon")
      .click("center", { force: true });
    cy.contains("Download PDF").should("exist");
  });
});
