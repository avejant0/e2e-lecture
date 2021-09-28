import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

const url = 'http://localhost:3000';

Given("I open todo list web app", () => {
  cy.visit(url);
});

Then("I see that there is {int} todo items", (expectedCount) => {
  cy.get('[data-cy="todo-item"]').should('have.length', 3);
});

Then("I see that items has following texts:", (table) => {
  const expectedList = table.rawTable.map((item) => item[0]);

  cy.get('[data-cy="todo-item"] label').each((el, index) => {
    expect(el.text()).to.equal(expectedList[index]);
  })
});