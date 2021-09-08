/// <reference types="Cypress" />

describe('home page', () => {
    it('should redirect', () => {
        cy.intercept({
            method: 'POST',
            url: 'http://localhost:8000/api/register/',
          }, {
            statusCode: 200,
            body: { error: 'aalu' },
            headers: { 'access-control-allow-origin': '*' },
            delayMs: 500,
          }).as('signup')
        cy.visit('/')
        cy.contains('signup').click()
        cy.get('nav').contains('signup').should('have.class', 'active')

        cy.get(`[formcontrolname="email"]`).type('test@test.com')
        cy.get('[formcontrolname="firstName"]').type('first name')
        cy.get('[formcontrolname="lastName"]').type('last name')
        cy.get('[formcontrolname="password"]').type('password')
        cy.get('[formcontrolname="confirmPassword"]').type('password')
        cy.get('button').contains('Signup').click()
        cy.wait('@signup')
        cy.get('.main-container').get('.title').should('have.text', 'Signup completed!')
    })
});