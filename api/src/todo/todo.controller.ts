import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto, GetTodoDto, UpdateTodoDto } from "./dto";

@Controller('/api/todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async getAll(): Promise<GetTodoDto[]> {
    return this.todoService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<GetTodoDto> {
    const todo = await this.todoService.getById(id);
  
    if (todo === null) {
      throw new NotFoundException();
    }

    return todo;
  }

  @Post()
  async create(@Body() todoToCreate: CreateTodoDto): Promise<GetTodoDto> {
      return this.todoService.create(todoToCreate);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() todoToUpdate: UpdateTodoDto): Promise<GetTodoDto> {
    const result = this.todoService.update(id, todoToUpdate);

    if (result === null) {
      throw new NotFoundException();
    }

    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any | null> {
    const result = await this.todoService.delete(id);

    if (result === null) {
      throw new NotFoundException();
    }

    return { success: true};
  }
}