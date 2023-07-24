describe('Cenário I: Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Login com standard_user', function () {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')
    cy.get('[id="inventory_container"]').should('exist')
  });

  it('Login com locked_out_user', function () {
    cy.get('[data-test="username"]').type('locked_out_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('eq', Cypress.config().baseUrl)
    cy.get('[data-test="error"]').should('exist')
    cy.contains('locked out').should('exist')
  });

})