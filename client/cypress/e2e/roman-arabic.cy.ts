describe('Roman/Arabic Numeral Converter', () => {
  beforeEach(() => {
    cy.visit('/problem/Roman%2FArabic%20Numeral%20Converter');
    cy.get('.roman-arabic__btn--flush-cache').click();
  });

  it('should display the headers', () => {
    cy.get('.roman-arabic__heading').should('exist');
    cy.get('.roman-arabic__paragraph').should('exist');
  });

  it('should display the input and buttons', () => {
    cy.get('.roman-arabic__input').should('exist');
    cy.get('.roman-arabic__btn--convert').should('exist');
    cy.get('.roman-arabic__btn--flush-cache').should('exist');
  });

  it('should display the table', () => {
    cy.get('.table').should('exist');
  });

  it('should convert a roman numeral to an arabic numeral', () => {
    cy.get('.roman-arabic__input').type('IV');
    cy.get('.roman-arabic__btn--convert').click();
    cy.get('.table').should('contain', 'IV');
    cy.get('.table').should('contain', '4');
  });

  it('should convert an arabic numeral to a roman numeral', () => {
    cy.get('.roman-arabic__input').type('14');
    cy.get('.roman-arabic__btn--convert').click();
    cy.get('.table').should('contain', 'XIV');
    cy.get('.table').should('contain', '14');
  });

  it('should display "Found in Cache" status', () => {
    cy.get('.roman-arabic__input').type('X');
    cy.get('.roman-arabic__btn--convert').click();
    cy.get('.table').should('contain', 'false');

    cy.get('.roman-arabic__input').clear().type('X');
    cy.get('.roman-arabic__btn--convert').click();
    cy.get('.table').should('contain', 'true');
  });

  it('should flush the cache and reset the table', () => {
    cy.get('.roman-arabic__input').type('X');
    cy.get('.roman-arabic__btn--convert').click();
    cy.get('.table').should('have.length', 1);

    cy.get('.roman-arabic__btn--flush-cache').click();
    cy.get('.table__no-data-cell').should('exist');
  });

  it('should display a success toast for a correct conversion', () => {
    cy.get('.roman-arabic__input').type('X');
    cy.get('.roman-arabic__btn--convert').click();
    cy.get('.toast--success').should('exist');
  });

  it('should display an error toast for an incorrect conversion', () => {
    cy.get('.roman-arabic__input').type('invalid');
    cy.get('.roman-arabic__btn--convert').click();
    cy.get('.toast--error').should('exist');
  });
});
