export const newCustomer = () => {
  const random = Math.floor(Math.random() * 1000);
  return {
    email: `cust${random}@foo.test`,
    password: 'password123',
    street: `${random} Main Street`,
    city: 'San Francisco',
    state: 'CA',
    zip: '94110',
    bags: '2',
  };
};

export const newLaundromat = () => {
  const random = Math.floor(Math.random() * 1000);
  return {
    businessName: `Suds-O-Matic ${random}`,
    email: `laundro${random}@foo.test`,
    password: 'password123',
    street: `${random} Suds Street`,
    city: 'San Francisco',
    state: 'CA',
    zip: '94110',
  };
};

export const selectService = {
  dryClean: 'Dry Clean',
  washAndFold: 'Wash & Fold',
};

export const orderType = {
  dryClean: 'dryClean',
  washAndFold: 'washNFold',
};

export const firstLaundroMat = {
  //this will need to be updated based on the first laundromat record (id=1)
  email: 'laundro725@foo.test',
  password: 'password123',
};

export const loginAsLaundromat = (laundromat) => {
  cy.visit(`${Cypress.env('url')}/admin/login`);
  cy.contains('Partner Portal');
  cy.get('.d-flex > #loginBtn').click();
  //This will need to be edited for whatever the 1st laundromat record email/password exists in database
  cy.get('#loginAdminEmail').type(laundromat.email);
  cy.get('#loginAdminPw').type(laundromat.password);
  cy.get('#loginForm > .mt-3').click();
  cy.contains('Your Customer Orders');
};
