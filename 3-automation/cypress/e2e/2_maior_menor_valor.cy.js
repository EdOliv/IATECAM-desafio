describe('Cenário II: Produtos com menor e maior valores', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })  

  it('Produto com menor preço', function () {
    cy.get('[data-test="product_sort_container"]').select('lohi')
    cy.get(':nth-child(1) > .inventory_item_description > .inventory_item_label').children('a[id="item_2_title_link"]')
      .should('exist')
      .click()

    cy.url().should('include', '/inventory-item.html?id=2')
    cy.get('.inventory_details_name').invoke('text').then(($value) => {
      cy.log("Produto mais barato -> " + $value)
    })
  });

  it('Produto com maior preço', function () {
    cy.get('[data-test="product_sort_container"]').select('hilo')
    cy.get(':nth-child(1) > .inventory_item_description > .inventory_item_label').children('a[id="item_5_title_link"]')
      .should('exist')
      .click()

    cy.url().should('include', '/inventory-item.html?id=5')
    cy.get('.inventory_details_name').invoke('text').then(($value) => {
      cy.log("Produto mais caro -> " + $value)
    })
  });

})