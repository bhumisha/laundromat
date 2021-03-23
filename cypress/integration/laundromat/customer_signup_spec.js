import { newCustomer } from './util/customer';

describe('tests customer signup functionality', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('/'); // baseUrl set in cypress.json
  });

  it('verifies new customer can sign up and submit - end to end critical path', () => {
    const customer = newCustomer();
    const tomorrow = Cypress.moment().add(1, 'days').format('YYYY-MM-DD');
    cy.log('Click Sign-Up button in hero');
    cy.get('.d-flex > #signUpBtn').click();
    cy.get('#signUpForm').should('be.visible');
    cy.get('#signUpEmail').type(customer.email);
    cy.get('#signUpPw').type(customer.password);
    cy.get('#pwVerify').type(customer.password);
    cy.get('#signUpStreetAdd').type(customer.street);
    cy.get('#signUpCity').type(customer.city);
    cy.get('#signUpState').select('CA');
    cy.get('#signUpState').should('have.value', 'CA');
    cy.get('#signUpZip').type(customer.zip);
    cy.get('#signUpForm > .mt-3').click();
    cy.contains('Place Your Order', { matchCase: false });
    cy.url().should('include', '/cust');
    //TODO: write assert that address show in Place Your Order is matches customer input
    //functionality is either not implemented or not currently working
    cy.log('enter order details');
    cy.get('input[name="srvcDate"]').type(tomorrow);
    cy.get('#serviceSelect').select('Dry Clean');
    cy.get('.btn').contains('Confirm').click();
    //TODO: clicking Confirm btn is current throwing an internal error.
  });
});

//TODO: add test to verify email address uniqueness

//TODO: Add test to login as user
//login error states:
//incorrect password
//email id not found
