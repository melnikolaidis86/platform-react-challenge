describe('Cat Lovers App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the homepage', () => {
    cy.getByTestId('load-more-button').contains('Load More');
  });

  it('loads more cats on click', () => {
    cy.getByTestId('load-more-button').click();
    cy.getByTestId('cat-card').should('have.length.greaterThan', 10);
  });

  it('opens modal when a cat card is clicked', () => {
    cy.getByTestId('cat-card').first().click();
    cy.getByTestId('cat-details-modal').should('be.visible');
    cy.getByTestId('cat-name').should('exist');
    cy.getByTestId('cat-description').should('exist');
  });
});


export {};