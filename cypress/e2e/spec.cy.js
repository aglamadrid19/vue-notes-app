describe('My First Test', () => {
  it('Website loads / home page / empty local storage', () => {
    cy.visit('http://localhost:8080/')
  })
})