import "cypress-wait-until";

Cypress.Commands.add("clearAuth", () => {
  cy.clearCookie("OCSESSID");
});

Cypress.Commands.add("signIntoAdmission", () => {
  cy.createNewAdmission();
  cy.get('div[data-test-id="in progress-column"]')
    .find("button[type='button']")
    .eq(1)
    .click();
  cy.contains("Start Resident Experience").click();
  cy.contains("Activate Magic Link/QR Code").click();
  cy.get('button[data-test-id^="loginLink"]')
    .invoke("data", "test-id")
    .then((d) => d.replace("loginLink-", ""))
    .as("magicLink");
  cy.get("@magicLink").then((l) => cy.visit(l));
  cy.contains("Continue with Admission").click({ force: true });
  cy.get('input[data-test-id="resident_firstName"]').type("Caperucita");
  cy.get('input[data-test-id="resident_lastName"]').type("Roja");
  cy.get('input[data-test-id="datepicker-input-resident_dateOfBirth"]').type(
    "1111-11-11"
  );
  cy.contains("Continue with Admission").click({ force: true });
  cy.url().should("include", "/prelude");
});

Cypress.Commands.add("visitWithAuth", (path) => {
  cy.visit(path, {
    auth: {
      username: Cypress.env("authUsername"),
      password: Cypress.env("authPassword"),
    },
  });
});

Cypress.Commands.add("submitLastFirstNames", (lastName, firstName) => {
  cy.get("input[data-test-id='resident_firstName']").clear().type(lastName);
  cy.get("input[data-test-id='resident_lastName']").clear().type(firstName);
});

Cypress.Commands.add("submitCredentials", (firstName, lastName) => {
  cy.get('input[data-test-id="resident_firstName"]').type(firstName);
  cy.get('input[data-test-id="resident_lastName"]').type(lastName);
  cy.get('input[data-test-id="datepicker-input-resident_dateOfBirth"]').type(
    "1111-11-11"
  );
});

Cypress.Commands.add("dashboardPageIsLoaded", () => {
  cy.wait(1500);
  // cy.get("button[data-test-id='archiveAdmissionDismissButton']").click();
  // cy.get('button[data-test-id="archiveAdmissionDismissButton"]', { timeout: 50000 }).should('exist')
});

Cypress.Commands.add("urlContains_DAshboard", () => {
  cy.url().should("eq", Cypress.config().baseUrl + "/admin/dashboard");
});

Cypress.Commands.add("addFlag", () => {
  cy.get('button[data-test-id="open-help-button"]').click({ force: true });
  cy.get("#flag-comment-input").type(
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet"
  );
  cy.get('button[data-test-id="add-flag-button"]').click({ force: true });
  cy.alertMessage("Your comment was successfully saved!");
});

Cypress.Commands.add("scrollDownAdmission", () => {
  cy.get('div[data-test-id="scrollableArea"]').scrollTo("bottom", {
    ensureScrollable: false,
  });
});

Cypress.Commands.add("persistCookies", () => {
  cy.getCookies().then((cookies) => {
    cy.log(JSON.stringify(cookies)); // See the cookie contents
    cy.writeFile("cookies.json", cookies);
  });
});

Cypress.Commands.add("clickAccept", () => {
  cy.get('button[data-test-id="continueButton"]')
    .should("not.be.disabled")
    .click();
});

Cypress.Commands.add("putSignatureApproval", () => {
  cy.get('div[data-test-id="signature"]')
    .scrollIntoView()
    .click({ release: false })
    .trigger("mousemove", { clientX: 200, clientY: 300 })
    .trigger("mouseup", 5, 5)
    .trigger("mouseleave");
});

Cypress.Commands.add("alertMessage", (message) => {
  cy.get("div.s-alert-wrapper", { timeout: 50000 }).should("contain", message);
});

Cypress.Commands.add("chooseFacility", () => {
  cy.get("button[data-test-id='createAdmissionDropdown']").click();
  cy.get("#headlessui-menu-items-4")
    .find("[role=menuitem]")
    .contains(Cypress.env("FacilityName"))
    .click();

  // cy.get("#headlessui-menu-items-4").find('[role=menuitem]').should('contain', Cypress.env('FacilityName')).click()
});

Cypress.Commands.add("chooseFacilityC", (facility) => {
  cy.get("button[data-test-id='createAdmissionDropdown']").click();
  cy.get("#headlessui-menu-items-4")
    .find("[role=menuitem]")
    .contains(facility)
    .click();
});

Cypress.Commands.add("clickSaveButton", () => {
  cy.get("button[data-test-id='saveDraftButton']")
    .scrollIntoView()
    .wait(1000)
    .click({ force: true })
    .wait(1000);
  cy.alertMessage("Admission data was saved successfully.");
});

Cypress.Commands.add("clickStartAdmissionButton", () => {
  cy.contains("Continue with Admission").click({ force: true });
  cy.url().should("include", "/prelude");
});

Cypress.Commands.add("clickStartAdmission", () => {
  cy.get("button[data-test-id='sendToResidentButton']")
    .scrollIntoView()
    .wait(1000)
    .click({ force: true })
    .wait(1000);
  cy.alertMessage("Admission was successfully sent to resident.");
});

Cypress.Commands.add("clickSaveButtonEditDraftForm", () => {
  cy.get("button[data-test-id='editDraftButton']")
    .scrollIntoView()
    .wait(1000)
    .click({ force: true })
    .wait(1000);
  cy.alertMessage("Admission data was saved successfully.");
});

Cypress.Commands.add("createNewAdmission", () => {
  cy.chooseFacility();
  //cy.get("#headlessui-menu-items-4").find('[role=menuitem]').should('contain', Cypress.env('FacilityName')).click()
  cy.get("input[data-test-id='resident_firstName']").type(
    Cypress.env("residentName")
  );
  cy.get("input[data-test-id='resident_lastName']")
    .should("exist")
    .type(Cypress.env("residentSurname"));
  //cy.get("#ae9ec5e0-f168-4721-9e6d-f2e017e3f25c").select('Female')
  cy.get("select[data-test-id='resident_gender']").select("Female");
  cy.get(
    "div[data-test-id='datepicker-resident_dateOfBirth'] input[type='date']"
  ).type("1111-11-11");
  cy.get("input[data-test-id='resident_address_street']").click();
  cy.get("input[data-test-id='resident_ssn']").type("123-45-5464");
  cy.get("input[data-test-id='resident_phone']").type("12312312345");
  cy.get("input[data-test-id='resident_email']").type(
    Cypress.env("residentEmail")
  );
  cy.get("input[data-test-id='resident_address_street']").type(
    "775 Nels Streets"
  );
  cy.get("input[data-test-id='resident_address_city']").type(
    "Port Trudiechester"
  );
  cy.get("select[data-test-id='resident_address_state']").select("Alabama");
  cy.get("input[data-test-id='resident_address_zipcode']").type("12345");
  cy.wait(1000);

  //Filling Admission Detail tab

  cy.get("div[data-test-id='preflightSideMenu-2']").click();
  cy.get("select[data-test-id='facilityPhysician']").select(1);
  cy.get(
    "input[data-test-id='datepicker-input-preflight_dateOfAdmission']"
  ).type("2021-09-12");
  cy.contains("General information").click();
  cy.contains("Short Term")
    .find("input[type='radio']")
    .first()
    .check({ force: true });
  cy.contains("Medicare A")
    .find("input[type='radio']")
    .first()
    .check({ force: true });
  cy.get("input[data-test-id='preflight_medicareAHicNumber']").type("152345");
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
  cy.get('div[data-test-id="in progress-column"]').should(
    "contain",
    "less than a minute ago"
  );
  cy.get('div[data-test-id="in progress-column"]').should(
    "contain",
    Cypress.env("residentName") + " " + Cypress.env("residentSurname")
  );
});

Cypress.Commands.add("createNewAdmissionWithoutEmails", () => {
  cy.login("user", { cacheSession: false });
  cy.chooseFacility();
  cy.get("input[data-test-id='resident_firstName']").type(
    Cypress.env("residentName")
  );
  cy.get("input[data-test-id='resident_lastName']")
    .should("exist")
    .type(Cypress.env("residentSurname"));
  cy.get("select[data-test-id='resident_gender']").select("Female");
  cy.get(
    "div[data-test-id='datepicker-resident_dateOfBirth'] input[type='date']"
  ).type("1945-09-12");
  cy.get("input[data-test-id='resident_address_street']").click();
  cy.get("input[data-test-id='resident_ssn']").type("123-45-5464");
  cy.get("input[data-test-id='resident_phone']").type("12312312345");
  cy.get("input[data-test-id='resident_address_street']").type(
    "775 Nels Streets"
  );
  cy.get("input[data-test-id='resident_address_city']").type(
    "Port Trudiechester"
  );
  cy.get("select[data-test-id='resident_address_state']").select("Alabama");
  cy.get("input[data-test-id='resident_address_zipcode']").type("12345");
  cy.wait(1000);

  //Filling Admission Detail tab

  cy.get("div[data-test-id='preflightSideMenu-2']").click();
  cy.get("select[data-test-id='facilityPhysician']").select(1);
  cy.get(
    "input[data-test-id='datepicker-input-preflight_dateOfAdmission']"
  ).type("2021-09-12");
  cy.contains("General information").click();
  cy.contains("Short Term")
    .find("input[type='radio']")
    .first()
    .check({ force: true });
  cy.contains("Medicare A")
    .find("input[type='radio']")
    .first()
    .check({ force: true });
  cy.get("input[data-test-id='preflight_medicareAHicNumber']").type("152345");
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
  cy.get('div[data-test-id="in progress-column"]').should(
    "contain",
    "less than a minute ago"
  );
  cy.get('div[data-test-id="in progress-column"]').should(
    "contain",
    Cypress.env("residentName") + " " + Cypress.env("residentSurname")
  );
});

Cypress.Commands.add("login", (name, { cacheSession = true } = {}) => {
  const login = () => {
    cy.visit("/admin");
    cy.get("input[placeholder='Email Address']").type(Cypress.env("Username"));
    cy.get("input[placeholder='Password']").type(Cypress.env("Password"));
    cy.get("button[data-test-id='loginButton']").click();
  };
  if (cacheSession) {
    cy.session(name, login);
  } else {
    login();
  }
});

Cypress.Commands.add("openMagicLink", () => {
  cy.contains("Start Resident Experience").click();
  cy.contains("Activate Magic Link/QR Code").click();
  cy.get('button[data-test-id^="loginLink"]')
    .invoke("data", "test-id")
    .then((d) => d.replace("loginLink-", ""))
    .as("magicLink");
  cy.get("@magicLink").then((l) => cy.visit(l));
});

Cypress.Commands.add("restoreCookies", () => {
  cy.readFile("cookies.json").then((cookies) => {
    cookies.forEach((cookie) => {
      // cy.log( JSON.stringify( cookie ) ); // See the cookie contents
      cy.setCookie(cookie.name, cookie.value, {
        domain: Cypress.env("domain"),
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expiry: cookie.expiry,
      });
    });
  });
});
