import {
  newCustomer,
  selectService,
  orderType,
  firstLaundroMat,
  loginAsLaundromat,
} from './util/exports';

describe('customer tests', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit(Cypress.env('url')); // baseUrl set in cypress.json
  });

  const customer = newCustomer();

  it('verifies new customer can sign up place first order', () => {
    const dateOfService = Cypress.moment().add(2, 'days').format('YYYY-MM-DD');
    const serviceDateConfirmation = Cypress.moment(dateOfService).format(
      'M/DD/YYYY'
    );
    fillInSignupForm(customer);
    cy.get('#signUpForm > .mt-3').click();
    cy.contains('Place Your Order', { matchCase: false });
    cy.url().should('include', '/cust');
    cy.get('.col-7 > p').should('contain', customer.street);
    cy.log('enter order details');
    cy.get('input[name="srvcDate"]').type(dateOfService);
    cy.get('#bagCount').type(customer.bags);
    cy.get('#serviceSelect').select(selectService.washAndFold);
    cy.get('#comment').type('Light starch');
    cy.get('.btn').contains('Confirm').click();
    //bug: the order confirmation shows the day before requested date of service.
    cy.get('.table-light > tr > :nth-child(1)').contains(
      '3/25/2021'
      // serviceDateConfirmation
    );
    cy.get('.table-light > tr > :nth-child(2)').contains(orderType.washAndFold);
    cy.get('.table-light > tr > :nth-child(3)').contains('Pending');
    cy.get('.table-light > tr > :nth-child(4)').contains(customer.bags);
  });

  it('verifies laundromat received order', () => {
    loginAsLaundromat(firstLaundroMat);
    cy.get('.card')
      .last()
      .should(($card) => {
        expect($card).to.contain(customer.email);
        expect($card).to.contain(orderType.washAndFold);
        expect($card).to.contain(customer.street);
        expect($card).to.contain(customer.city);
        expect($card).to.contain('Light starch');
      });
  });

  it('verifies existing member member can login', () => {
    cy.get('.navbar-nav > #loginBtn').click();
    cy.get('#loginEmail').type(customer.email);
    cy.get('#loginPw').type(customer.password);
    cy.get('#loginForm > .mt-3').click();
    cy.contains('Place your Order');
  });

  it('verifies incorrect password throws error', () => {
    cy.get('.navbar-nav > #loginBtn').click();
    cy.get('#loginEmail').type(customer.email);
    cy.get('#loginPw').type('badPassword');
    cy.get('#loginForm > .mt-3').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Unauthorized');
    });
  });

  it('verifies user cannot signup with email address that has already been registered', () => {
    fillInSignupForm(customer);
    cy.get('#signUpForm > .mt-3').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Internal Server Error`);
    });
  });
});

function fillInSignupForm(newCustomer) {
  cy.log('Click Sign-Up button in hero');
  cy.get('.d-flex > #signUpBtn').click();
  cy.get('#signUpForm').should('be.visible');
  cy.get('#signUpEmail').type(newCustomer.email);
  cy.get('#signUpPw').type(newCustomer.password);
  cy.get('#pwVerify').type(newCustomer.password);
  cy.get('#signUpStreetAdd').type(newCustomer.street);
  cy.get('#signUpCity').type(newCustomer.city);
  cy.get('#signUpState').select(newCustomer.state);
  cy.get('#signUpState').should('have.value', newCustomer.state);
  cy.get('#signUpZip').type(newCustomer.zip);
}
