import { loginAsLaundromat, newLaundromat } from './util/exports';

const laundromat = newLaundromat();

describe('tests laundromat signup functionality', () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  before(() => {
    cy.visit(Cypress.env('url')); // baseUrl set in cypress.json
  });

  it('verifies new laundromat can sign up and logout  - end to end critical path', () => {
    cy.contains('Join Here').click();
    cy.get('#signUpForm').should('not.be.visible');
    cy.log('Verifies sign-up button opens signup modal');
    cy.get('#signUpBtn').click();
    cy.get('#signUpForm').should('be.visible');
    cy.log('Fill in laundromat registration form');
    cy.get('#signUpName').type(laundromat.businessName);
    cy.get('#signUpEmail').type(laundromat.email);
    cy.get('#signUpPw').type(laundromat.password);
    cy.get('#pwVerify').type(laundromat.password);
    cy.get('#signUpStreetAdd').type(laundromat.street);
    cy.get('#signUpCity').type(laundromat.city);
    cy.get('#signUpState').select(laundromat.state);
    cy.get('#signUpState').should('have.value', laundromat.state);
    cy.get('#signUpZip').type(laundromat.zip);
    cy.get('#signUpForm > .mt-3').click();
    cy.get('#adminLogout').click();
  });

  it('verifies new laundromat can login in and does not see any orders yet', () => {
    loginAsLaundromat(laundromat);
    cy.contains('No orders yet!');
  });
});
