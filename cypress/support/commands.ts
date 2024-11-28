Cypress.Commands.add('loginViaUi', () => {
    cy.visit('http://localhost:5173/account')
    cy.get('input[placeholder="Nazwa użytkownika"]').type('Bruno Szwec')
    cy.get('input[placeholder=Hasło]').type('password1')
    cy.get('button[type=submit]').click()
    cy.get('#wback div').contains('Bruno Szwec')

})