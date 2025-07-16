describe('Cat Lovers App', () => {

  it('loads the homepage', () => {
    cy.visit('/');
    cy.getByTestId('load-more-button').contains('Load More');
  });

  it('loads more cats on click', () => {
    cy.visit('/');
    cy.getByTestId('load-more-button').click();
    cy.getByTestId('cat-card').should('have.length.greaterThan', 10);
  });
});


export {};