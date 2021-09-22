import { Controller, Get } from "@nestjs/common";
import { TodoService } from "./todo.service";

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAll(): string[] {
    return this.todoService.getAll();
  }
}