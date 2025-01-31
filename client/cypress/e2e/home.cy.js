/* eslint-disable no-undef */
describe("homePage", () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  })
  
  it("Navbar contains Cinema Page", () => {
    cy.contains('Cinema Page').should('be.visible')
  });

  //.only comand before it makes only that test to start and
  //skip the other tests that dont have the .only property

  it("validate that all MovieCards have an image", () => {
    cy.get('[data-testid^="MovieCard-"]').each((card, index) => {
      // find all movie cards by how the test id statrs whith an does a for cicle
      cy.wrap(card).within(() => {
        //whith the comand cy.wrap we can interact with the card and interact with the image and with .whitin the comands only will affect this card
        cy.get("img").should("have.attr", "src"); // validates tha the MovieCard have an image
      });
      cy.log(`Validated MovieCard at index: ${index}`); // validation of the MovieCard
    });
  });

  it("should validate navigation to buy tickets page and correct movie id in the url", () => {
    cy.get('[data-testid^="MovieCard-"]').each((_, index) => {
      cy.get('[data-testid^="MovieCard-"]').eq(index).then((card) => {
        const testId = card.attr("data-testid");
        const movieId = testId.split("-")[1];

        cy.wrap(card).within(() => {
          cy.get("img").click()
        })

        cy.url().should("include", `/buy-tickets/${movieId}`)

        cy.contains("Schedule").should("be.visible")

        cy.go("back")

        cy.url().should("eq", "http://localhost:5173/")
      })
    })
  });

  it('should validate correct register and login credentials', () => {
    const user = {
      firstName: 'Geovanny',
      lastName: 'Castro',
      email: 'testmail@mail.com',
      password: '123456'
    }

    cy.get('[data-testid=login]').click()
    
    cy.url().should('eq', 'http://localhost:5173/login')

    cy.get('[data-testid=register]').click()
    cy.contains('Please register').should('be.visible')

    cy.get('input[name=firstName]').click().type(user.firstName)

    cy.get('input[name=lastName]').click().type(user.lastName)

    cy.get('input[name=email]').click().type(user.email)

    cy.get('input[name=password]').click().type(user.password)

    cy.get('[data-testid=register-btn]').click()

    cy.contains('Please login').should('be.visible')

    cy.get('[data-testid=login-btn]').click()

    cy.url().should('eq', 'http://localhost:5173/')
    cy.contains('My tickets').should('be.visible')

    cy.get('[data-testid=login]').click()
    cy.window().its('localstorage.token').should('not.exist')
  })
  
});
