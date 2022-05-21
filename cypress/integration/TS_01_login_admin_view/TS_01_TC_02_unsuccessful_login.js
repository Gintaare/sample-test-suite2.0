const { user1: randomUser1 } = require("../../fixtures/user");
describe(" TS_01_TC_02 Unsuccessful login", () => {
  beforeEach(() => {
    cy.visit("/admin/");
  });

  it("Invalid credentials gives error", () => {
    cy.get("input[placeholder='Email Address']").type(randomUser1.email);
    cy.get("input[placeholder='Password']").type(randomUser1.password);
    cy.get("button[data-test-id='loginButton']").click();
    cy.contains("Incorrect email or password.").should("exist");
  });

  it("Empty fields give error", () => {
    cy.get("button[data-test-id='loginButton']").click();
    cy.contains("This field is required.").should("exist");
    cy.contains("This field is required.").should("exist");
  });

  it("Email without @ gives error", () => {
    cy.get("input[placeholder='Email Address']").type("andreygmail.com");
    cy.get("input[placeholder='Password']").type(randomUser1.password);
    cy.get("button[data-test-id='loginButton']").click();
    cy.url().should("not.contain", "/dashboard");
  });

  it("Email without .com gives error", () => {
    cy.get("input[placeholder='Email Address']").type("andreygmail@com");
    cy.get("input[placeholder='Password']").type(randomUser1.password);
    cy.get("button[data-test-id='loginButton']").click();
    cy.url().should("not.contain", "/dashboard");
  });

  it("Show/X button is working", () => {
    cy.get("input[placeholder='Email Address']").type(Cypress.env("Username"));
    cy.get("div.css-1ftnb6o").eq(0).click({ force: true });
    cy.get("input[placeholder='Email Address']").should("be.empty");
    cy.get("input[placeholder='Password']").type(Cypress.env("Password"));
    cy.get("div.css-1ftnb6o").eq(0).click({ force: true });
    cy.get("input[placeholder='Password']").should("be.empty");
  });
});
