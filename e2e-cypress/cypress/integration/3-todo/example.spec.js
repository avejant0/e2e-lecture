describe(('local test'), () => {
  beforeEach(async () => {
    await cy.task('seed:db', {
      todos: [
        {
          id: 'b5fc4701-85c3-4fca-89be-20c3b10264c4',
          content: 'Feed the cat',
          isDone: true
        },
        {
          id: '80c9c3f0-55ea-4bac-af31-4e07ce1debba',
          content: 'Brush the teeth',
          isDone: false
        },
        {
          id: '304119e7-50c6-4473-95a1-e6079bbec06f',
          content: 'Do exercises',
          isDone: false
        }
      ]
    });

    await cy.visit('http://localhost:3000')
  })

  it('displays 3 todo items by default', () => {
    cy.get('[data-cy="todo-item"]').should('have.length', 3)

  })
});