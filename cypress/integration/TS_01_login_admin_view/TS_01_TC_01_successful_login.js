describe(" TS_01_TC_01 Successful login", () => {
  beforeEach(() => {
    cy.visit("/admin");
  });

  it("Successful login redirects you to Dashboard", () => {
    cy.get("input[placeholder='Email Address']").type(Cypress.env("Username"));
    cy.get("input[placeholder='Password']").type(Cypress.env("Password"));
    cy.get("button[data-test-id='loginButton']").click();
    cy.url("").should("include", "/admin/dashboard");
    cy.persistCookies();
  });

  it("Pressing the Back button should not log out the user", () => {
    cy.get("input[placeholder='Email Address']").type(Cypress.env("Username"));
    cy.get("input[placeholder='Password']").type(Cypress.env("Password"));
    cy.get("button[data-test-id='loginButton']").click();
    cy.dashboardPageIsLoaded();
    cy.go("back");
    cy.url("").should("include", "/admin/dashboard");
  });
});
