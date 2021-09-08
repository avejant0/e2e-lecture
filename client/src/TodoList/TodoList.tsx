import React, { ChangeEvent } from "react";

import { Button, FormGroup, TextField } from "@material-ui/core";
import TodoItem from "../TodoItem/TodoItem";

function TodoList() {
  const [todoPk, setTodoPk] = React.useState(3);
  const [todos, setTodos] = React.useState([
    { id: "1", content: 'Brush a teeth', isDone: false},
    { id: "2", content: 'Buy potatoes', isDone: false},
    { id: "3", content: 'Pat da cat', isDone: true},
  ]);

  const [newTodoText, setNewTodoText] = React.useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const targetIndex = todos.findIndex((todo) => todo.id === event.target.value);
    if (targetIndex !== -1) {
      todos[targetIndex].isDone = !todos[targetIndex].isDone;
      setTodos([...todos]);
    }
  };

  const handleAddTodo = () => {
    if (newTodoText === '') {
      return;
    }
    const newTodo = { id: String(todoPk + 1), content: newTodoText, isDone: false };
    setTodoPk(todoPk + 1);
    setTodos([...todos, newTodo])
    setNewTodoText('');
  };

  const handleTodoUpdate = (todoId: string, newContent: string) => {
    const targetIndex = todos.findIndex((todo) => todo.id === todoId);
    if (targetIndex !== -1) {
      todos[targetIndex].content = newContent;
      setTodos([...todos]);
    }

  };


  const handleTodoRemove = (todoId: string) => {
    const targetIndex = todos.findIndex((todo) => todo.id === todoId);
    if (targetIndex !== -1) {
      setTodos(todos.filter((_, index) => index !== targetIndex));
    }
  }; 

  const handleInputChange = (event: any) => {
    setNewTodoText(event.target.value);
  };

  return (
    <FormGroup>
        {
          todos.map(({id, content, isDone}) => {
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

export default TodoList;