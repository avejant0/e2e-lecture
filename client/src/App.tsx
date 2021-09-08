import React from 'react';
import './App.css';
import TodoList from './TodoList/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoList></TodoList>
      </header>
    </div>
  );
}

export default App;
