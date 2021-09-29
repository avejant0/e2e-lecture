import { Injectable } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';

import Todo from './todo.model';

@Injectable()
export class TodoRepository {
  private readonly collectionName: string = 'todos';
  private db: lowdb.LowdbAsync<any> = null;
 
  public async findAll(): Promise<Todo[]> {
    await this.init();

    const todos = await this.db.get(this.collectionName).value();
    return todos;
  }

  public async create(todo: Todo): Promise<Todo> {
    await this.init();

    const todos = await this.db.get(this.collectionName).value();
    console.log(todos);
    todos.push(todo);
    await this.db.set(this.collectionName, todos).write();
    return todo;
  }

  public async findById(id: string): Promise<Todo | null> {
    await this.init();

    const todos = await this.db.get(this.collectionName).value();
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return null;
    }

    return todo;
  }

  public async update(id: string, updatedTodo: Todo): Promise<Todo> {
    await this.init();

    const todos = await this.db.get(this.collectionName).value();
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    todos[todoIndex] = updatedTodo;
    
    await this.db.set(this.collectionName, todos).write();

    return updatedTodo;
  }

  public async delete(id: string): Promise<undefined | null>  {
    await this.init();
    const todos = await this.db.get(this.collectionName).value();

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return null;
    }

    const updatedTodos = todos.filter((todo) => todo.id !== id);

    await this.db.set(this.collectionName, updatedTodos).write();

    return;
  }
  
  public async clearAll(): Promise<void> {
    await this.init();
    await this.db.set(this.collectionName, []).write();    
  }

  private async init(): Promise<void> {
    const adapter = new FileAsync(this.getDbPath());
    this.db = await lowdb(adapter);
    const todos = await this.db.get(this.collectionName).value();
    if (!todos) {
      await this.db.set(this.collectionName, []).write();
    }
  }

  private getDbPath() {
    const mainPath = '../db';
    if (process.env.NODE_ENV === "test") {
      return `${mainPath}/db.test.json`;
    }

    return `${mainPath}/db.json`;
  }

}