describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display problem cards', () => {
    cy.get('[data-test="problem-card"]').should('have.length.greaterThan', 0);
  });

  it('should navigate to the solve page when clicking a problem card', () => {
    cy.get('[data-test="problem-card"]').first().click();
    cy.url().should('include', '/problem/');
  });
});
