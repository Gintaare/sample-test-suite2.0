const { user1: randomUser1 } = require("../../fixtures/user");

describe("TS_03_TC_03 Login from dashboard", () => {
  beforeEach(() => {
    cy.login("user", { cacheSession: false });
    cy.dashboardPageIsLoaded();
  });

  it.skip("It is possible to download QR pdf file", () => {
    cy.get('div[data-test-id="in progress-column"]')
      .find("button[type='button']")
      .eq(1)
      .click();
    cy.contains("Download PDF").click();
    cy.downloadFile(
      "https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg",
      "Downloads",
      "Reside - Apple Apple - Caperucita Roja.pdf"
    );
    cy.readFile("./Downloads/Reside - Apple Apple - Caperucita Roja.pdf");
  });
});
