describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should not display the home button on the home page', () => {
    cy.get('[data-test="home-button"]').should('not.exist');
  });

  it('should display the home button when not on the home page', () => {
    cy.get('[data-test="problem-card"]').first().click();

    cy.get('[data-test="home-button"]').should('exist');
  });

  it('should navigate to the home page when clicking the home button', () => {
    cy.get('[data-test="problem-card"]').first().click();

    cy.get('[data-test="home-button"]').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should not display the back button on the home page', () => {
    cy.get('[data-test="back-button"]').should('not.exist');
  });

  it('should display the back button when there is a previous page', () => {
    cy.get('[data-test="problem-card"]').first().click();

    cy.get('[data-test="back-button"]').should('exist');
  });

  it('should navigate to the previous page when clicking the back button', () => {
    cy.get('[data-test="problem-card"]').first().click();

    cy.get('[data-test="back-button"]').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should navigate to the not found page for invalid URLs', () => {
    cy.visit('/invalid-url');

    cy.url().should('include', '/page-not-found');

    cy.get('.navbar__heading').should('exist');
  });
});
