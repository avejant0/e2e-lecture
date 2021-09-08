import React from 'react';
import './App.css';
import TodoList from './TodoList/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
        <div className="TodoList-container">
          <TodoList></TodoList>
        </div>
      </header>
    </div>
  );
}

export default App;
