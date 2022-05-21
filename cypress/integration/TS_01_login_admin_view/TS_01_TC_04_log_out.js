describe(" TS_01_TC_04 Log out", () => {
  it("The user is redirected to home page after clicking on Log Out button", () => {
    cy.login("user", { cacheSession: false });
    cy.dashboardPageIsLoaded();
    cy.get("div[data-test-id='userMenu']").click();
    cy.contains("Log Out").click();
    cy.url().should("not.include", "/dashboard");
  });

  it("Pressing back button should not log in the user back", () => {
    cy.go("back");
    cy.url("").should("not.include", "/dashboard");
  });
});
