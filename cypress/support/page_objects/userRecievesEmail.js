import axios from "axios";
import { email_config } from "../../config/email_config";
export class userRecievesEmail {
  userRecievesEmail() {
    context("TESTING EMAIL CONFIG", () => {
      let startTimestamp;
      context("Signup", () => {
        before(() => {
          // Your test signup page:
          cy.visit("/admin");
        });
        it("enter email", () => {
          startTimestamp = Date.now();
          cy.login("user", { cacheSession: false });
          cy.createNewAdmission();
        });
      });

      context("Verify email", () => {
        let inbox;
        before((done) => {
          axios
            .get(
              `${email_config.testMailEndpoint}&tag=${email_config.testMailTag}&timestamp_from=${startTimestamp}&livequery=true`
            )
            .then((response) => {
              inbox = response.data;
              done();
            })
            .catch((err) => {
              done(err);
            });
        });

        it("Email was sent", () => {
          expect(inbox.result).to.equal("success");
          expect(inbox.count).to.equal(1);
        });

        it("Email contains login link", () => {
          const html = inbox.emails[0].html;
          expect(html).to.have.string("BEGIN YOUR ADMISSION");
          const extract = /id="button" href="(.+?)"/gi;
          const link = extract.exec(html)[1];
          cy.log(link);
        });
      });
    });
  }
}
export const onuserRecievesEmail = new userRecievesEmail();
