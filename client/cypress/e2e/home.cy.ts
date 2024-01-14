describe('Home Page', () => {
  it('Displays problem grid and navigates to problem details on click', () => {
    // Intercept the API request and provide the fixture response
    cy.intercept('GET', '/api/v1/leetcode/problems', {
      fixture: 'problemsResponse.json',
    }).as('getProblems');

    // Visit the home page
    cy.visit('/');

    // Wait for the API request to complete
    cy.wait('@getProblems');

    // Get all problem cards on the grid
    cy.get('[data-test="problem-card"]').each(($card, index) => {
      console.log('NEW ITERATION-----------');
      console.log('index: ', index);
      console.log('$card: ', $card.text());

      const encodedName = encodeURIComponent(
        $card.find('h2').text().toLowerCase()
      );

      // Click on the card
      cy.wrap($card)
        .click()
        .then(() => {
          // Assert that the URL has changed correctly
          cy.url().should('eq', `http://localhost:5173/problem/${encodedName}`);

          // Go back to the main page
          cy.go('back');

          cy.request('/api/v1/leetcode/problems');
        });
    });
  });
});
