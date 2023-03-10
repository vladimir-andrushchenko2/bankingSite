/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('is a functional app', () => {
    cy.get('.title').should('have.text', 'Вход в аккаунт');

    cy.get('#login-input').type('developer');
    cy.get('#password-input').type('skillbox');
    cy.get('.input-submit').click();

    cy.get('.title').should('have.text', 'Ваши счета');
    cy.get('.account-open-link').first().click();

    cy.get('.title').should('have.text', 'Просмотр счёта');
    cy.get('.history').click();

    cy.get('.title').should('have.text', 'История баланса');

    cy.get('.map-link').click();
    cy.get('.title').should('have.text', 'Карта банкоматов');

    cy.get('.currencies-link').click();
    cy.get('.title').should('have.text', 'Валютный обмен');

    cy.get('.exit-link').click();
    cy.get('.title').should('have.text', 'Вход в аккаунт');
  });
});
