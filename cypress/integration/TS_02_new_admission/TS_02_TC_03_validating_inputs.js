const { user1: randomUser1 } = require("../../fixtures/user");

describe("TS_02_TC_03 Input validation", () => {
  it("Empty  fields show error", () => {
    cy.login("user", { cacheSession: false });
    cy.dashboardPageIsLoaded();
    cy.chooseFacility();

    cy.get("div[data-test-id='preflightSideMenu-2']").click();
    cy.get("button[data-test-id='sendToResidentButton']").click();
    cy.get("div[data-test-id='preflightSideMenu-0']").click();
    cy.get("div[data-test-id='field-error-resident_firstName']").contains(
      "This field is required"
    );
    cy.get("div[data-test-id='field-error-resident_lastName']").contains(
      "This field is required"
    );
    cy.get("div[data-test-id='field-error-resident_gender']").contains(
      "This field is required"
    );
    cy.get("div[data-test-id='field-error-resident_dateOfBirth']").contains(
      "This field is required"
    );
    cy.get("div[data-test-id='field-error-resident_ssn']").contains(
      "This field is required"
    );
    cy.get("div[data-test-id='field-error-resident_phone']").contains(
      "This field is required"
    );
    cy.get("div[data-test-id='field-error-resident_address_street']").contains(
      "This field is required"
    );
    cy.get("div[data-test-id='field-error-resident_address_city']").contains(
      "This field is required"
    );
    cy.get("div[data-test-id='field-error-resident_address_state']").contains(
      "This field is required"
    );
    cy.get("div[data-test-id='field-error-resident_address_zipcode']").contains(
      "This field is required"
    );

    //Representative Information's tab

    cy.get("div[data-test-id='preflightSideMenu-1']").click();
    cy.get('button[type="button"]')
      .contains("Add Representative Information")
      .click();
    cy.get(
      "div[data-test-id='field-error-emergencyContact.0.firstName']"
    ).contains("This field is required");
    cy.get(
      "div[data-test-id='field-error-emergencyContact.0.lastName']"
    ).contains("This field is required");
    cy.get("div[data-test-id='field-error-emergencyContact.0.phone']").contains(
      "This field is required"
    );
    cy.get(
      "div[data-test-id='field-error-emergencyContact.0.relationshipType']"
    ).contains("This field is required");

    //Admission Detail's tab

    cy.get("div[data-test-id='preflightSideMenu-2']").click();
    cy.get("div[data-test-id='field-error-facilityPhysician']").contains(
      "This field is required"
    );
    cy.get(
      "div[data-test-id='field-error-preflight_dateOfAdmission']"
    ).contains("This field is required");
    cy.get("div[data-test-id='field-error-preflight_stayType']").contains(
      "This field is required"
    );
    cy.get("div[data-test-id='field-error-preflight_payerSource']").contains(
      "This field is required"
    );
    cy.get(
      "div[data-test-id='field-error-preflight_secondaryPayerSource']"
    ).contains("This field is required");
  });

  it("Days Remaining field only accepts 0 - 100 value", () => {
    cy.contains("Medicare A")
      .find("input[type='radio']")
      .first()
      .check({ force: true });
    cy.get(
      "div[data-test-id='field-error-preflight_medicareAHicNumber']"
    ).contains("This field is required");
    cy.get("div[data-test-id='field-error-preflight_daysRemaining']").contains(
      "This field is required"
    );
    cy.get("input[data-test-id='preflight_daysRemaining']").type("150");
    cy.get("div[data-test-id='field-error-preflight_daysRemaining']").contains(
      "This field must be between 0 and 100."
    );
  });

  it("SSN field only accepts numbers", () => {
    cy.get("div[data-test-id='preflightSideMenu-0']").click();
    cy.get("input[data-test-id='resident_ssn']").type("asdas,!");
    cy.get("input[data-test-id='resident_ssn']").should("be.empty");
    cy.get("input[data-test-id='resident_ssn']").type("56468").click();
    cy.get("input[data-test-id='resident_phone']").click();
    cy.get("div[data-test-id='field-error-resident_ssn']").should(
      "contain",
      "Entered value is not valid Social Security Number."
    );
  });

  it("Phone number field only accepts numbers", () => {
    cy.get("input[data-test-id='resident_phone']").type("sdfsdf@#$@#");
    cy.get("input[data-test-id='resident_phone']").should("be.empty");
    cy.get("input[data-test-id='resident_phone']").type("56468");
    cy.get("input[data-test-id='resident_address_zipcode']").click();
    cy.get("div[data-test-id='field-error-resident_phone']").contains(
      "Entered value is in invalid format."
    );
  });

  it("Zip code field only accepts numbers", () => {
    cy.get("input[data-test-id='resident_address_zipcode']").type(
      "sdfsdf@#$@#"
    );
    cy.get("input[data-test-id='resident_address_zipcode']").should("be.empty");
    cy.get("input[data-test-id='resident_address_zipcode']")
      .clear()
      .type("123");
    cy.get("input[data-test-id='resident_phone']").click();
    cy.get("div[data-test-id='field-error-resident_address_zipcode']").contains(
      "Entered value is in not valid zip code number."
    );
  });

  it("Email field only accepts valid value", () => {
    cy.get("input[data-test-id='resident_phone']").click();
    cy.get("input[placeholder='E-mail (Optional)']").type("andreygmail.com");
    cy.get("input[data-test-id='resident_phone']").click();
    cy.get("div[data-test-id='field-error-resident_email']").contains(
      "This field format is invalid. Correct format is name@domain.tld."
    );
    cy.get("input[placeholder='E-mail (Optional)']")
      .clear()
      .type("andreygmail@com");
    cy.get("div[data-test-id='field-error-resident_email']").contains(
      "This field format is invalid. Correct format is name@domain.tld."
    );
  });

  it("Only one representive can be selected as a primary contact ", () => {
    cy.get("div[data-test-id='preflightSideMenu-1']").click();
    cy.get('button[type="button"]')
      .contains("Add Representative Information")
      .click();
    cy.get(
      "circle[data-test-id='fill-radio-emergencyContact.1.primaryContact-true']"
    ).click({ force: true });
    cy.get(
      "circle[data-test-id='fill-radio-emergencyContact.0.primaryContact-true']"
    ).should("be.not.selected");
  });
});
