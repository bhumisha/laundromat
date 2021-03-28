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
    cy.get('#bagCount').clear().type(customer.bags);
    cy.get('#serviceSelect').select(selectService.washAndFold);
    cy.get('#comment').type(customer.comment);
    cy.get('.btn').contains('Confirm').click();
    cy.get('.table-light > tr > :nth-child(2)').contains(orderType.washAndFold);
    cy.get('.table-light > tr > :nth-child(3)').contains('Pending');
    cy.get('.table-light > tr > :nth-child(4)').contains(customer.bags);
    //bug: the order confirmation shows the day before requested date of service, which causes this test to fail:
    cy.get('.table-light > tr > :nth-child(1)').contains(
      serviceDateConfirmation
    );
  });

  it('verifies laundromat received order and can view customer comments', () => {
    loginAsLaundromat(firstLaundroMat);
    cy.get('.card')
      .last()
      .should(($card) => {
        expect($card).to.contain(customer.email);
        expect($card).to.contain(orderType.washAndFold);
        expect($card).to.contain(customer.street);
        expect($card).to.contain(customer.city);
        expect($card).to.contain('Pending');
      });
    cy.log('Verify laundromat can view customer comment');
    cy.get('.card > .card-body > .col-12').last().click();
    cy.get('.modal-dialog')
      .last()
      .should(($comment) => {
        expect($comment).to.contain(customer.comment);
        expect($comment).to.contain(customer.email);
      });
  });

  it('verifies laundromat with existing orders can email customer ', () => {
    loginAsLaundromat(firstLaundroMat);
    cy.get('.card')
      .last()
      .within(() => {
        cy.contains('Email')
          .should('have.attr', 'href')
          .and('include', 'mailto')
          .and('include', customer.email)
          .and('include', 'SimpleSuds - your order');
      });
  });

  it('verifies laundromat with pending order can accept order', () => {
    loginAsLaundromat(firstLaundroMat);
    cy.get('.card').last().contains('Pending').click();
    cy.get('.card').last().contains('Accepted');
  });

  it('verifies customer sees laundromat accepted order',
    () => {
      loginAsCustomer(customer, true);
      cy.contains('Accepted');
    });

  it('verifies existing member member can login', () => {
    loginAsCustomer(customer, true);
    cy.contains('Place your Order');
  });

  it('verifies incorrect password throws error', () => {
    loginAsCustomer(customer, false)
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

function loginAsCustomer(customer, goodPassword?) {
  cy.get('.navbar-nav > #loginBtn').click();
  cy.get('#loginEmail').type(customer.email);
  if(goodPassword) {
    cy.get('#loginPw').type(customer.goodPassword);
  } else {
    cy.get('#loginPw').type(customer.badPassword);
  }
  cy.get('#loginForm > .mt-3').click();
}

function fillInSignupForm(newCustomer) {
  cy.log('Click Sign-Up button in hero');
  cy.get('.d-flex > #signUpBtn').click();
  cy.get('#signUpForm').should('be.visible');
  cy.get('#signUpEmail').type(newCustomer.email);
  cy.get('#signUpPw').type(newCustomer.goodPassword);
  cy.get('#pwVerify').type(newCustomer.goodPassword);
  cy.get('#signUpStreetAdd').type(newCustomer.street);
  cy.get('#signUpCity').type(newCustomer.city);
  cy.get('#signUpState').select(newCustomer.state);
  cy.get('#signUpState').should('have.value', newCustomer.state);
  cy.get('#signUpZip').type(newCustomer.zip);
}
