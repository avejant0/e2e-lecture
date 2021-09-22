import { Injectable } from "@nestjs/common";

@Injectable()
export class TodoService {
  private readonly todos: string[] = ["Feed the cat", "Brush teeth"];

  getAll(): string[] {
    return this.todos;
  }
}