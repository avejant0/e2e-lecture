Feature: Todo list
  
  I want to use todo list for keeping my tasks in order

Background:
  Given I open todo list web app

Scenario: Check default todo items
  Then I see that there is 3 todo items
    And I see that items has following texts:
      | Feed the cat    |
      | Brush the teeth | 
      | Do exercises    |
