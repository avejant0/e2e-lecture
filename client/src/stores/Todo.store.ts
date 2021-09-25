import { makeObservable, observable, action } from "mobx";
import axios from "axios";
import { TodoModel } from "../models/todo.model";

class TodoStore {
  todos: TodoModel[] = [];
  processing: boolean = false;

  constructor() {
    makeObservable(this, {
      todos: observable,
      processing: observable,
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

  async fetchAll() {
    this.processing = true;
    const { data } = await axios.get('/api/todos'); 
    this.todos = [...data];
    this.processing = false;
  }

  async addTodo(newTodo: { content: string }) {
    this.processing = true;
    await axios.post('/api/todos', newTodo);
    await this.fetchAll();
  };

  async updateTodo(id: string, todoToUpdate: { content?: string, isDone?: boolean}) {
    this.processing = true;
    await axios.patch(`/api/todos/${id}`, todoToUpdate);
    await this.fetchAll();
  }

  async removeTodo(id: string) {
    this.processing = true;
    await axios.delete(`/api/todos/${id}`);
    await this.fetchAll();
  }

  async toggleTodoStatus(id: string) {
    const todoStatus = this.getTodoStatus(id);
    await this.updateTodo(id, { isDone: !todoStatus });
  };
}

export default new TodoStore();