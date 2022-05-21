const { user1: randomUser1 } = require("../../fixtures/user");
const { user2: randomUser2 } = require("../../fixtures/user");
export class creatingAcmeAdmission {
  creatingAcmeAdmission() {
    cy.get("input[data-test-id='resident_firstName']").type(
      randomUser1.firstName
    );
    cy.get("input[data-test-id='resident_lastName']").type(
      randomUser1.lastName
    );
    cy.get("select[data-test-id='resident_gender']").select("Female");
    cy.get(
      "div[data-test-id='datepicker-resident_dateOfBirth'] input[type='date']"
    ).type("1111-11-11");
    cy.get("input[data-test-id='resident_address_street']").click();
    cy.get("input[data-test-id='resident_ssn']").type("123-45-5464");
    cy.get("input[data-test-id='resident_phone']").type("343-253-5428");
    cy.get("input[data-test-id='resident_email']").type(
      Cypress.env("residentEmail")
    );
    cy.get("input[data-test-id='resident_address_street']").type(
      randomUser1.address.street
    );
    cy.get("input[data-test-id='resident_address_city']").type(
      randomUser1.address.city
    );
    cy.get("select[data-test-id='resident_address_state']").select("Alabama");
    cy.get("input[data-test-id='resident_address_zipcode']").type("125875458");
    cy.wait(350);
    // cy.contains("Save Pre-Flight").click({ force: true });
    // cy.alertMessage("Admission data was saved successfully.");

    //Filling Representative Information tab
    cy.get("div[data-test-id='preflightSideMenu-1']").click();
    cy.get('button[type="button"]')
      .contains("Add Representative Information")
      .click();
    cy.get("input[data-test-id='emergencyContact.0.firstName']").type(
      randomUser2.firstName
    );
    cy.get("input[data-test-id='emergencyContact.0.lastName']").type(
      randomUser2.lastName
    );

    cy.get(
      "[data-test-id='fill-radio-emergencyContact.0.relationshipType-GUARDIAN_OF_THE_ESTATE']"
    ).click({ force: true });

    cy.get("input[data-test-id='emergencyContact.0.email']").type(
      Cypress.env("representativeEmail")
    );
    cy.get("input[data-test-id='emergencyContact.0.phone']").type(
      "343-253-5968"
    );
    cy.get(
      "input[data-test-id='radio-emergencyContact.0.primaryContact-true']"
    ).click({ force: true });

    cy.wait(350);

    //Filling Admission Detail tab
    cy.get("div[data-test-id='preflightSideMenu-2']").click();
    cy.get("select[data-test-id='facilityPhysician']").select(1);
    cy.get(
      "input[data-test-id='datepicker-input-preflight_dateOfAdmission']"
    ).type("2022-02-08");
    // cy.contains("General information").click();
    cy.contains("Short Term")
      .find("input[type='radio']")
      .first()
      .check({ force: true });
    cy.contains("Medicare A")
      .find("input[type='radio']")
      .first()
      .check({ force: true });
    cy.get("input[data-test-id='preflight_medicareAHicNumber']").type(
      randomUser1.dob.day
    );
    cy.get("input[data-test-id='preflight_daysRemaining']").type("10");
    //cy.get("button[data-test-id='sendToResidentButton']").scrollIntoView()
    cy.contains("Private Pay - Patient Liability")
      .find("input[type='checkbox']")
      .first()
      .check({ force: true });
    cy.get(
      "textarea[placeholder='Enter Information for Benefits Coverage - Private Pay - Patient Liability']"
    ).type("lorem ipsum");
    cy.clickStartAdmission();
    cy.urlContains_DAshboard();
    cy.dashboardPageIsLoaded();
  }
}

export const oncreatingAcmeAdmission = new creatingAcmeAdmission();
