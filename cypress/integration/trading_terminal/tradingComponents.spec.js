/// <reference types="cypress"/>
describe('Manipulate components', () => {
    before(() => {
        cy.visit('/')

    })
    it('Login and submit API keys', () => {
        cy.get('[placeholder="Password"]').type('test1')
        cy.get('.green').click()
    })
    it('Close all components', () => {
        cy.get('.icon-cancel').its('length').then(res => {
            if (res > 0) {
                cy.get('.icon-cancel').each(($el) => {
                    cy.wrap($el).click()
                })
            }
        })
        cy.get('.react-draggable').should('not.exist');
    })
    it('Click on + to add Component', () => {
        cy.get('.icon-plus').click()
        cy.get('.hfui-modal__content').should('be.visible')
    })
    it('Try Empty option', () => {
        cy.get('.hfui-modal__actions button').click()
        cy.get('.error').should('contain', 'Invalid Component')
    })
    it('Open Chart component', () => {
        cy.get('.hfui-dropdown__button').click()
        cy.get('.hfui-modal__content ul li').contains('Chart').click()
        cy.get('.hfui-modal__actions button').click()
    })
    it('Drag component', () => {
        cy.get('.icon-move').trigger('mousedown').trigger('mousemove', { clientX: 1000, clientY: 200 }).trigger('mouseleave')
    })
    it('Resize component', () => {
        cy.get('.icon').click()
    })
})