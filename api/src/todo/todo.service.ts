import {v4 as uuidv4} from 'uuid';
import { Injectable } from "@nestjs/common";
import { CreateTodoDto, GetTodoDto, UpdateTodoDto } from "./dto";
import Todo from "./todo.model";

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: '26fbc2ba-f877-48c9-8201-4bccc1dc6318', content: "Feed cat", isDone: false },
    { id: '4c90b854-9a15-405d-ab68-70505ed068b5', content: "Brush teeth", isDone: true }
  ];

  getAll(): GetTodoDto[] {
    return this.todos;
  }

  getById(id: string): GetTodoDto | null {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      return null;
    }

    return todo;
  }

  create(todoToCreate: CreateTodoDto): GetTodoDto {
    const todoModel: Todo = { id: uuidv4(), content: todoToCreate.content, isDone: false };
    this.todos.push(todoModel);
    return todoModel;
  }

  update(id: string, todoToUpdate: UpdateTodoDto): GetTodoDto | null {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return null;
    }

    if (todoToUpdate.content) {
      this.todos[todoIndex].content = todoToUpdate.content;
    }

    if (todoToUpdate.isDone !== undefined) {
      this.todos[todoIndex].isDone = todoToUpdate.isDone;
    }

    return this.todos[todoIndex];
  }

  delete(id: string) {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      return null;
    }

    this.todos = this.todos.filter((todo) => todo.id !== id);

    return "";
  }
}