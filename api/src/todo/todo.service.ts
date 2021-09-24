import {v4 as uuidv4} from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto, GetTodoDto, UpdateTodoDto } from './dto';
import Todo from './todo.model';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async getAll(): Promise<GetTodoDto[]> {
    return this.todoRepository.findAll();
  }

  async getById(id: string): Promise<GetTodoDto | null> {
    return this.todoRepository.findById(id);
  }

  async create(todoToCreate: CreateTodoDto): Promise<GetTodoDto> {
    const todoModel: Todo = { id: uuidv4(), content: todoToCreate.content, isDone: false };
    await this.todoRepository.create(todoModel);
    return todoModel;
  }

  async update(id: string, todoToUpdate: UpdateTodoDto): Promise<GetTodoDto | null> {
    const todo: Todo = await this.todoRepository.findById(id);

    if (todo === null) {
      return todo;
    }

    if (todoToUpdate.content) {
      todo.content = todoToUpdate.content;
    }

    if (todoToUpdate.isDone !== undefined) {
      todo.isDone = todoToUpdate.isDone;
    }   

    return this.todoRepository.update(id, todo);
  }

  async delete(id: string): Promise<undefined | null> {
    return this.todoRepository.delete(id);
  }
}