function sleep(mills = 1_500) {
  cy.wait(mills)
}

function login() {
  cy.visit('http://localhost:3000')
  cy.url().should("eq", "http://localhost:3000/")
  cy.get('.space-x-4 > .transform').click()
  cy.url().should('eq', 'http://localhost:3000/auth/login/')
  cy.get('#account').type('admin')
  cy.get('#password').type('admin')
  cy.get('.bg-purple-500').click()
  cy.url().should("eq", "http://localhost:3000/")
}

function checkNotInternalError() {
  cy.contains('Internal Error').should("not.exist")
}

function addToBasket() {
  cy.contains('Coffee (Test mode)').click()
  sleep()
  cy.get('.justify-center').click()
  cy.url().should("eq", `http://localhost:3000/baskets`)
}

describe('Test FE', () => {
  it('Test login', () => {
    login()
    checkNotInternalError()
  })

  it('Test add product', () => {
    login()
    cy.visit("http://localhost:3000/product/admin/add/")

    cy.get('#name').type("Coffee (Test mode)")
    cy.get(':nth-child(3) > .w-full').selectFile("tests/assets/demo.jpg")
    cy.get('img').invoke("attr", "src").then(($val) => {
      cy.request($val!).should((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.headers["content-type"]).to.contain("image/")
      })

      cy.get('#description').type("Testing mode")
      cy.get('#price').type('{selectall}').type("399")
      cy.get('#stocks').type('{selectall}').type("1000")
      cy.get('.bg-purple-500').click()
      cy.url().should("eq", "http://localhost:3000/")
      checkNotInternalError()
    })
  })

  it('Test add to basket', () => {
    login()
    addToBasket()
    checkNotInternalError()
  })

  it('Test delete basket', () => {
    login()
    cy.visit("http://localhost:3000/baskets")
    cy.contains('ลบ').click()
    cy.get('.text-center > .text-3xl').should('have.text', 'ไม่พบสินค้าในตะกร้า')
    checkNotInternalError()
  })

  it('Test checkout basket', () => {
    login()
    addToBasket()

    cy.faker().then((faker) => {
      const mobile = faker.phone.number().replaceAll(" ", "") + "1"

      // Fake insert
      cy.get('#name').type(faker.person.fullName())
      cy.get('#mobile').type(mobile)
      cy.get('#address').type(faker.location.secondaryAddress())
      cy.get(':nth-child(4) > .w-full').select("เชียงใหม่")
      cy.get(':nth-child(5) > .w-full').select("เมืองเชียงใหม่")
      cy.get(':nth-child(6) > .w-full').select("ช้างเผือก")
      cy.get('.p-5 > .bg-purple-500').click()
      cy.url().should("eq", `http://localhost:3000/orders`)
      checkNotInternalError()
    })
  })

  it('Test edit product', () => {
    login()
    cy.get(':nth-child(1) > .space-x-3 > a.bg-purple-500').click()

    cy.get('#name').type('{selectall}').type("Coffee (Test mode #2)")
    cy.get(':nth-child(3) > .w-full').selectFile("tests/assets/demo2.jpg")
    cy.get('img').invoke("attr", "src").then(($val) => {
      cy.request($val!).should((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.headers["content-type"]).to.contain("image/")
      })

      cy.get('#description').type('{selectall}').type("Edit mode")
      cy.get('#price').type('{selectall}').type("499")
      cy.get('#stocks').type('{selectall}').type("3999")
      cy.get('.bg-purple-500').click()
      cy.url().should("eq", "http://localhost:3000/")
      checkNotInternalError()
    })
  })

  it('Test delete product', () => {
    login()
    cy.contains('ลบ').click()
    cy.url().should("eq", "http://localhost:3000/")
    checkNotInternalError()
  })
})