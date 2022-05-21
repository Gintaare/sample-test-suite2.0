const { user1: randomUser1 } = require("../../fixtures/user");

export class creatingShortexAdmission {
  creatingShortexAdmission() {
    cy.chooseFacilityC("Shortixito");
    cy.get("input[data-test-id='resident_firstName']")
      .type(randomUser1.firstName)
      .invoke("val")
      .as("residentFirstName");
    cy.get("input[data-test-id='resident_lastName']")
      .should("exist")
      .type(randomUser1.lastName)
      .invoke("val")
      .as("residentlastName");
    cy.get("select[data-test-id='resident_gender']").select("Female");
    cy.get("[data-test-id='resident_age']").type("80");

    cy.get(
      "div[data-test-id='datepicker-preflight_dateOfAdmission'] input[type='date']"
    ).type("2022-04-11");
    cy.contains("General information").click();
    cy.get(
      "div[data-test-id='datepicker-resident_dateOfBirth'] input[type='date']"
    ).type("1111-11-11");
    cy.get("input[data-test-id='resident_email']")
      .click()
      .type(Cypress.env("residentEmail"));
    cy.get("input[data-test-id='resident_ssn']").type("123-45-5464");

    cy.get("input[data-test-id='resident_phone']").type(randomUser1.phone);

    cy.contains("Medicaid Pending").click();
    cy.contains("Not Applicable").click();
    cy.wait(1000);
    cy.clickStartAdmission();
    cy.urlContains_DAshboard();
    cy.dashboardPageIsLoaded();

    cy.get('div[data-test-id="in progress-column"]').should(
      "contain",
      "less than a minute ago"
    );
    cy.get('a[href*="/admin/admissions"]')
      .eq(1)
      .invoke("text")
      .as("newResidentlastName");
    cy.get("@residentlastName").then((residentlastName) => {
      cy.get("@newResidentlastName").then((newResidentlastName) => {
        expect(newResidentlastName).to.contains(residentlastName);
      });
    });
  }
}

export const oncreatingShortexAdmission = new creatingShortexAdmission();

export class fillingShortexAdmission {
  fillingShortexAdmission() {
    cy.get('input[data-test-id="radio-representative_role-RESIDENT"]').check({
      force: true,
    });
    cy.get('button[type="submit"]').click({ force: true });
    cy.contains("Continue").click();
    cy.contains("Print Name").scrollIntoView();
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.get('div[data-test-id="mainSignature"]')
      .scrollIntoView()
      .click({ release: false })
      .trigger("mousemove", { clientX: 200, clientY: 300 })
      .trigger("mouseup", 5, 5)
      .trigger("mouseleave");
    cy.get('div[data-test-id="scrollableArea"]').scrollTo("bottom");
    // cy.scrollTo(0, 1337, { ensureScrollable: false });
    // cy.contains("Date").scrollTo("bottom", { ensureScrollable: false });
    cy.clickAccept();
    cy.scrollDownAdmission();
    cy.clickAccept();
    cy.scrollDownAdmission();
    cy.get('input[data-test-id="checkbox-test-one"]').click({ force: true });
    cy.clickAccept();
    cy.scrollDownAdmission();
    cy.contains("I Decline the Arbitration Agreement Rider Policy").click();

    const clickUntil = () => {
      cy.get("h1").then(($body) => {
        if ($body.text().includes("Sign Admission")) {
          cy.log("Sign Admission");
          return;
        }
        cy.wait(100);
        cy.scrollDownAdmission();
        cy.get('button[data-test-id="continueButton"]').click({
          force: true,
        });
        clickUntil();
      });
    };
    clickUntil();
    cy.get('button[data-test-id="sign-confirm-button"]').click({ force: true });
    cy.get('button[data-test-id="sign-confirm-button"]').should("not.exist");
    cy.get("h1", { timeout: 10000 }).eq(1).contains("Congratulations!");
  }
}

export const onfillingShortexAdmission = new fillingShortexAdmission();
