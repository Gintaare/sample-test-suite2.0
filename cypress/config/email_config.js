
const TAG = "resident";

export const email_config = {
  testMailEndpoint: `https://api.testmail.app/api/json?apikey=${Cypress.env('TESTMAIL_APIKEY')}&namespace=${Cypress.env('TESTMAIL_NAMESPACE')}`,

  testMailTag: TAG,
  
  testMail: `${Cypress.env('TESTMAIL_NAMESPACE')}.${TAG}@inbox.testmail.app`
}


