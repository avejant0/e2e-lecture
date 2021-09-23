import { makeObservable, observable, action } from "mobx";
import axios from "axios";
import { TodoModel } from "../models/todo.model";

class TodoStore {
  todos: TodoModel[] = [];
  constructor() {
    makeObservable(this, {
      todos: observable,
      fetchAll: action,
      addTodo: action,
      removeTodo: action,
      updateTodo: action,
      toggleTodoStatus: action,
    });
  }

  getTodoStatus(id: string) {
    const todoToUpdate: TodoModel | undefined = this.todos.find((todo) => todo.id === id);
    return todoToUpdate?.isDone;
  }

  fetchAll = async () => {
    const { data } = await axios.get('/api/todos'); 
    this.todos = [...data];
  }

  addTodo = async (newTodo: { content: string }) => {
    await axios.post('/api/todos', newTodo);
    await this.fetchAll();
  };

  updateTodo = async (id: string, todoToUpdate: { content?: string, isDone?: boolean}) => {
    await axios.patch(`/api/todos/${id}`, todoToUpdate);
    await this.fetchAll();
  }

  removeTodo = async (id: string) => {
    await axios.delete(`/api/todos/${id}`);
    await this.fetchAll();
  }

  toggleTodoStatus = async (id: string) => {
    const todoStatus = this.getTodoStatus(id);
    await this.updateTodo(id, { isDone: !todoStatus });
  };
}

export default new TodoStore();