describe('Cenário 3: Comprar dois produtos', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })  

  it('Comprar dois produtos', function () {
    // adicionar produtos
    cy.get('[data-test="product_sort_container"]').select('lohi')
    cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price').siblings()
      .should('exist')
      .click()
    cy.get('.shopping_cart_badge').should('have.text', '1')

    cy.get('[data-test="product_sort_container"]').select('hilo')
    cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price').siblings()
      .should('exist')
      .click()
    cy.get('.shopping_cart_badge').should('have.text', '2')

    // carrinho
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')
    cy.get('.inventory_item_name').then(($value) => {
      let length = $value.length
      expect($value).to.have.length(2);
    })
    cy.get('[data-test="checkout"]').click()

    // checkout 1
    cy.url().should('include', '/checkout-step-one.html')
    cy.get('[data-test="firstName"]').type('standard')
    cy.get('[data-test="lastName"]').type('user')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()

    // checkout 2
    cy.url().should('include', '/checkout-step-two.html')
    cy.get('.inventory_item_name').then(($value) => {
      let length = $value.length
      expect($value).to.have.length(2);
    })

    var first = 0
    cy.get(':nth-child(3) > .cart_item_label > .item_pricebar > .inventory_item_price').invoke('text').then(($value) => { 
      first = parseFloat($value.replace('$', ''))
      cy.log("Preço do primeiro produto -> " + first)
    })

    var second = 0
    cy.get(':nth-child(4) > .cart_item_label > .item_pricebar > .inventory_item_price').invoke('text').then(($value) => { 
      second = parseFloat($value.replace('$', ''))
      cy.log("Preço do segundo produto -> " + second)
    })

    var tax = 0
    cy.get('.summary_tax_label').invoke('text').then(($value) => { 
      tax = parseFloat($value.replace('Tax: $', ''))
      cy.log("Imposto -> " + tax)
    })

   cy.get('.summary_total_label').invoke('text').then(($value) => { 
      var total = $value.replace('Total: $', '')
      cy.log("Total calculado -> " + total)
      var expected_total = (first+second+tax).toFixed(2)
      cy.log("Total esperado -> " + expected_total)
      expect(total).to.equal(expected_total)
   })

   cy.get('[data-test="finish"]').click()

   // checkout 3
   cy.url().should('include', '/checkout-complete.html')
   cy.get('.complete-header').should('exist')
   cy.get('[data-test="back-to-products"]').click()
   cy.url().should('include', '/inventory.html')

  });

})