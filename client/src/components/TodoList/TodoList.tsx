import React, { useEffect } from "react";
import { observer } from "mobx-react-lite"

import { Button, FormGroup, TextField } from "@material-ui/core";
import TodoItem from "../TodoItem/TodoItem";

import todoStore from "../../stores/Todo.store";
import { TodoModel } from "../../models/todo.model";

function TodoList() {
  useEffect(() => {
    todoStore.fetchAll();
  }, []);

  const [newTodoText, setNewTodoText] = React.useState('');

  const handleChange = async (todoId: string) => {
    await todoStore.toggleTodoStatus(todoId);
  };

  const handleAddTodo = async () => {
    if (newTodoText === '') {
      return;
    }
    const todoToCreate = { content: newTodoText };
    await todoStore.addTodo(todoToCreate);
    setNewTodoText('');
  };

  const handleTodoUpdate = async (todoId: string, newContent: string) => {
    await todoStore.updateTodo(todoId, { content: newContent});
  };

  const handleTodoRemove = async (todoId: string) => {
    await todoStore.removeTodo(todoId);
  }; 

  const handleInputChange = (event: any) => {
    setNewTodoText(event.target.value);
  };

  return (
    <FormGroup>
        {
           todoStore.todos.map(({id, content, isDone}: TodoModel) => {
            return (
              <TodoItem 
                key={id}
                id={id} 
                content={content} 
                isDone={isDone} 
                handleChange={handleChange}
                handleRemove={handleTodoRemove}
                handleEdit={handleTodoUpdate}
              />
            );
          })
        }

        <FormGroup row={true}>
          <TextField id="outlined-basic" variant="outlined" onChange={handleInputChange} value={newTodoText}/>
          <Button variant="contained" onClick={handleAddTodo}>Add Todo</Button>  
        </FormGroup> 
    </FormGroup>
  );
}

export default observer(TodoList);