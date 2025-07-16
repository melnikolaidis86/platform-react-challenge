declare global {
    namespace Cypress {
        interface Chainable {
            getByTestId(testId: string): Chainable;
        }
    }
}

Cypress.Commands.add('getByTestId', (testId: string) =>
    cy.get(`[data-test-id="${testId}"]`)
);

export {};