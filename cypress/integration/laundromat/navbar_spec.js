describe('navbar tests', () => {
  beforeEach(() => {
    cy.clearCookies();
    // '/' = baseUrl set in cypress.json - currently set to localhost:3000
    cy.visit('/');
  });

  it('navbar-brand links to homepage', () => {
    cy.log('Verify navbar-brand href');
    cy.get('.navbar-brand').should('have.attr', 'href').and('eq', '/');
  });

  it('navbar login button opens login modal', () => {
    cy.log('Login modal is not visible until navbar button clicked');
    cy.get('#loginForm').should('not.be.visible');
    cy.get('.navbar-nav > #loginBtn').click();
    cy.get('#loginForm').should('be.visible');
  });

  it('navbar signup button opens signup modal', () => {
    cy.log('Signup modal is not visible until navbar button clicked');
    cy.get('#signUpForm').should('not.be.visible');
    cy.get('.navbar-nav > #signUpBtn').click();
    cy.get('#signUpForm').should('be.visible');
  });
});
