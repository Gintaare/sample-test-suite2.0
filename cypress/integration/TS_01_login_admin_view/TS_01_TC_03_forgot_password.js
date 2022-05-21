const { user1: randomUser1 } = require("../../fixtures/user");
describe(" TS_01_TC_03 Forgot password", () => {
  beforeEach(() => {
    cy.visit("/admin");
  });

  it("Forget password button is working 1", () => {
    //cy.get("a[data-test-id='forgot-password']").click()
    cy.get("a[href='/request-reset-email']").click();
    cy.url().should("include", "request-reset-email");
    cy.contains("Reset Password").should("exist");
  });

  it("Forget password button is working 2", () => {
    cy.get("input[placeholder='Email Address']").type("andrey@gmail.com");
    cy.get("input[placeholder='Password']").type(randomUser1.password);
    cy.get("a[data-test-id='forgot-password']").click();
    //cy.get("a[href='/request-reset-email']").click()
    cy.contains("Reset Password").should("exist");
    cy.url().should("include", "request-reset-email");
    cy.contains("Reset Password").should("exist");
  });

  it("Email field validation", () => {
    //cy.get("a[data-test-id='forgot-password']").click()
    cy.get("a[href='/request-reset-email']").click();
    cy.get("button[type='submit']").click();
    cy.contains("This field is required.").should("exist");
    cy.get("input[data-test-id='email']").type("andreygmail");
    cy.url().should("include", "request-reset-email");
    cy.contains(
      "This field format is invalid. Correct format is name@domain.tld."
    ).should("exist");
  });

  it.skip("The user recieves the link", () => {});
});
