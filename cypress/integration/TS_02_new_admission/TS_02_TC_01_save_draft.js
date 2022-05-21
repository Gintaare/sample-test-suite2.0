const { user1: randomUser1 } = require("../../fixtures/user");

beforeEach(() => {
  cy.login("user", { cacheSession: false });
  // cy.get('.spinner', { timeout: 15000 }).should('not.be.visible')
  cy.dashboardPageIsLoaded();
});

describe("TS_02_TC_01 Save a draft", () => {
  it("The user is able to save a draft", () => {
    //cy.get("button[data-test-id='createAdmissionButton']").click()
    cy.chooseFacility();
    cy.get("input[data-test-id='resident_firstName']").type(
      randomUser1.firstName
    );
    cy.get("input[data-test-id='resident_lastName']").type(
      randomUser1.lastName
    );
    //cy.get("#ae9ec5e0-f168-4721-9e6d-f2e017e3f25c").select('Female')
    cy.get("select[data-test-id='resident_gender']").select("Female");
    cy.get(
      "div[data-test-id='datepicker-resident_dateOfBirth'] input[type='date']"
    ).type(
      randomUser1.dob.year +
        "-" +
        randomUser1.dob.day2 +
        "-" +
        randomUser1.dob.day3
    );
    cy.get("input[data-test-id='resident_address_street']").click();
    cy.get("input[data-test-id='resident_ssn']").type("546-54-6464");
    cy.get("input[data-test-id='resident_phone']").type("12312312345");
    cy.get("input[data-test-id='resident_address_street']").type(
      randomUser1.address.street
    );
    cy.get("input[data-test-id='resident_address_city']").type(
      randomUser1.address.city
    );
    cy.get("select[data-test-id='resident_address_state']").select("Alabama");
    cy.get("input[data-test-id='resident_address_zipcode']").type("12345");
    cy.clickSaveButton();
    cy.get("a[data-test-id='dashboardLink']").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/admin/dashboard");
    cy.get('div[data-test-id="pre-flight-column"]').should(
      "contain",
      "less than a minute ago"
    );
  });

  it("The user is able to save a draft with filled first and second name fields only", () => {
    cy.chooseFacility();
    cy.submitLastFirstNames("Monica", "Belucci");
    cy.clickSaveButton();
    cy.get("a[data-test-id='dashboardLink']").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/admin/dashboard");
    // cy.get('button[data-test-id="archiveAdmissionDismissButton"]', { timeout: 50000 }).should('exist')
    cy.get('div[data-test-id="pre-flight-column"]').should(
      "contain",
      "less than a minute ago"
    );
    cy.get('div[data-test-id="pre-flight-column"]').should(
      "contain",
      "Monica Belucci"
    );
  });

  it("The user is able to edit the draft in pre-flight column. The changes are reflected", () => {
    //cy.get('div[data-test-id="pre-flight-column"]').contains('Monica Belucci').parent().find('.button').click()
    cy.contains("Admission ID:").eq(0).invoke("text").as("admission_ID");
    cy.get('div[data-test-id="pre-flight-column"]')
      .find("button[type='button']")
      .eq(0)
      .click();
    cy.url("include", "admin/facility/");
    cy.contains("Resident Information");
    cy.contains("Resident Address");
    cy.submitLastFirstNames("Edited", "Draft");
    cy.clickSaveButtonEditDraftForm();
    cy.get("a[data-test-id='dashboardLink']").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/admin/dashboard");
    cy.get('div[data-test-id="pre-flight-column"]').should(
      "contain",
      "less than a minute ago"
    );
    cy.get('div[data-test-id="pre-flight-column"]').should(
      "contain",
      "Edited Draft"
    );
    cy.contains("Admission ID:").invoke("text").as("Admission ID");
    cy.contains("Admission ID:").eq(0).invoke("text").as("new_admission_ID");
    cy.get("@admission_ID").then((admission_ID) => {
      cy.get("@new_admission_ID").then((new_admission_ID) => {
        expect(new_admission_ID).to.eq(admission_ID);
      });
    });
  });
});
